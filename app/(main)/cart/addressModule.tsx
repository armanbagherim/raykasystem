import { fetcher } from '@/app/components/global/fetcher';
import MapClient from '@/app/components/global/MapClient';
import SearchSelect from '@/app/components/global/SearchSelect';
import { useTheme } from '@emotion/react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function AddressModule({ handleClose, open, coordinates, setCoordinates, getAddress }) {
    const [isLoading, setIsLoading] = useState(false);
    const [level, setLevel] = useState(1);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);

    const [errors, setErrors] = useState({});
    const NESHAN_API_KEY = "service.8cc8247dd8a4495bb5d7fdadbc278ed2";

    const defaultCoordinates = {
        latitude: "35.65326",
        longitude: "51.35471",
    };

    const [address, setAddress] = useState({
        name: '',
        provinceId: 1,
        cityId: 1,
        neighborhoodId: 1,
        street: '',
        alley: '',
        plaque: '',
        floorNumber: '',
        postalCode: '',
        coordinates: coordinates?.latitude && coordinates?.longitude ? coordinates : defaultCoordinates
    });

    useEffect(() => {
        if (!open) {
            setLevel(1);
            setErrors({});
            setAddress({
                name: '',
                provinceId: 1,
                cityId: 1,
                neighborhoodId: 1,
                street: '',
                alley: '',
                plaque: '',
                floorNumber: '',
                postalCode: '',
                coordinates: defaultCoordinates
            });
            setCoordinates(defaultCoordinates);
        }
    }, [open]);

    const validateStep1 = () => {
        const newErrors = {};
        if (!address.provinceId) newErrors.provinceId = "استان الزامی است.";
        if (!address.cityId) newErrors.cityId = "شهر الزامی است.";

        const isTehran = address.provinceId === 8 && address.cityId === 215;
        if (isTehran) {
            if (!coordinates.latitude || !coordinates.longitude || coordinates.latitude === "35.65326" && coordinates.longitude === "51.35471") {
                newErrors.coordinates = "موقعیت مکانی برای تهران الزامی است.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        // بررسی نام آدرس
        if (!address.name) newErrors.name = "نام آدرس الزامی است.";

        // بررسی خیابان
        if (!address.street) newErrors.street = "آدرس خیابان الزامی است.";

        // بررسی پلاک
        if (!address.plaque) newErrors.plaque = "پلاک الزامی است.";

        // بررسی طبقه
        if (!address.floorNumber) newErrors.floorNumber = "طبقه الزامی است.";

        // بررسی کد پستی
        if (!address.postalCode) {
            newErrors.postalCode = "کد پستی الزامی است.";
        } else if (!/^\d{10}$/.test(address.postalCode)) {
            newErrors.postalCode = "کد پستی باید ۱۰ رقمی باشد.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkLocation = () => {
        if (!validateStep1()) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setLevel(2);
        }, 1000);
    };

    const save = async () => {
        if (!validateStep2()) return;

        setIsLoading(true);

        const addressToSend = {
            ...address,
            latitude: address.coordinates.latitude,
            longitude: address.coordinates.longitude,
        };

        await fetcher({
            url: `/v1/api/ecommerce/user/addresses`,
            method: "POST",
            body: addressToSend
        }).then((res) => {
            console.log(res)
            if (res.statusCode == 201) {
                setIsLoading(false);
                getAddress();
                handleClose();
            }
        });
    };

    const getProvinces = async () => {
        await fetcher({
            url: `/v1/api/ecommerce/provinces`,
            method: "GET",
        }).then((res) => {
            setProvinces(res.result);
        });
    };

    const getCities = async (pid) => {
        await fetcher({
            url: `/v1/api/ecommerce/cities?provinceId=${pid}`,
            method: "GET",
        }).then((res) => {
            setCities(res.result);
            setAddress(prev => ({
                ...prev,
                cityId: res.result[0]?.id || null
            }));
        });
    };

    const getNeighborhoods = async (cid) => {
        await fetcher({
            url: `/v1/api/ecommerce/neighborhoods?cityId=${cid}`,
            method: "GET",
        }).then((res) => {
            setNeighborhoods(res.result);
            setAddress(prev => ({
                ...prev,
                neighborhoodId: res.result[0]?.id || null
            }));
        });
    };

    useEffect(() => {
        getProvinces();
    }, []);

    useEffect(() => {
        if (address.provinceId) {
            getCities(address.provinceId);
        }
    }, [address.provinceId]);

    useEffect(() => {
        if (address.cityId) {
            getNeighborhoods(address.cityId);
        }
    }, [address.cityId]);

    useEffect(() => {
        setAddress(prev => ({
            ...prev,
            coordinates: coordinates || defaultCoordinates
        }));

        // Call Neshan API when coordinates change and we're in Tehran
        if (coordinates.latitude && coordinates.longitude &&
            address.provinceId === 8 && address.cityId === 215) {
            getAddressFromCoordinates(coordinates.latitude, coordinates.longitude);
        }
    }, [coordinates]);

    const getAddressFromCoordinates = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
                {
                    headers: {
                        'Api-Key': NESHAN_API_KEY
                    }
                }
            );
            const data = await response.json();
            if (data.status === "OK" && data.formatted_address) {
                handleAddressChange('street', data.formatted_address);
            }
        } catch (error) {
            console.error("Error fetching address from coordinates:", error);
        }
    };

    const handleAddressChange = (field, value) => {
        setAddress(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const shouldShowMap = address.provinceId === 8 && address.cityId === 215;

    // Function to convert Persian digits to English
    const convertToEnglishDigits = (str) => {
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return str.split('').map(char => {
            const index = persianDigits.indexOf(char);
            return index !== -1 ? englishDigits[index] : char;
        }).join('');
    };

    // Handle change for fields that should have digits in English
    const handleFieldChange = (field, value) => {
        const convertedValue = convertToEnglishDigits(value);
        handleAddressChange(field, convertedValue);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            maxWidth="xl"
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                ثبت آدرس جدید
            </DialogTitle>
            <DialogContent className="w-full md:w-[600px]">
                <DialogContentText>
                    <div>
                        {level === 1 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="">
                                        {provinces && (
                                            <SearchSelect
                                                onChange={(e) => {
                                                    handleAddressChange('provinceId', e?.id || 1);
                                                }}
                                                data={provinces}
                                                value={address.provinceId}
                                                defaultValue={address.provinceId}
                                                isDiff={true}
                                                diffName="name"
                                                label="استان"
                                            />
                                        )}
                                    </div>
                                    <div className="">
                                        {cities && (
                                            <SearchSelect
                                                onChange={(e) => {
                                                    handleAddressChange('cityId', e?.id || cities[0]?.id);
                                                }}
                                                data={cities}
                                                value={address.cityId}
                                                defaultValue={address.cityId}
                                                isDiff={true}
                                                diffName="name"
                                                label="شهر"
                                            />
                                        )}
                                    </div>
                                </div>

                                {shouldShowMap && (
                                    <MapClient
                                        height={400}
                                        defaultLocation={{
                                            lat: coordinates?.latitude ?? 35.65326,
                                            lng: coordinates?.longitude ?? 51.35471,
                                        }}
                                        onLocationChange={(location) => {
                                            setCoordinates({
                                                latitude: location.lat.toString(),
                                                longitude: location.lng.toString(),
                                            });
                                        }}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="">
                                <div className="mb-8 mt-4">
                                    <TextField
                                        type="text"
                                        id="first_name"
                                        className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        required
                                        label="نام آدرس: مثال خانه"
                                        value={address.name}
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => {
                                            handleAddressChange('name', e.target.value);
                                        }}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4 mb-6">
                                    {neighborhoods && (
                                        <SearchSelect
                                            nullable={true}
                                            onChange={(e) => {
                                                handleAddressChange('neighborhoodId', e?.id || neighborhoods[0]?.id);
                                            }}
                                            data={neighborhoods}
                                            value={address.neighborhoodId}
                                            defaultValue={address.neighborhoodId}
                                            label="محله"
                                        />
                                    )}
                                </div>
                                <div className="flex gap-4 mb-6">
                                    <div className="w-full flex-1">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            id="street"
                                            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900 mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required
                                            label="آدرس"
                                            fullWidth
                                            value={address.street}
                                            onChange={(e) => {
                                                handleAddressChange('street', e.target.value);
                                            }}
                                            error={!!errors.street}
                                            helperText={errors.street}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            id="plaque"
                                            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required
                                            label="پلاک"
                                            value={address.plaque}
                                            onChange={(e) => {
                                                handleFieldChange('plaque', e.target.value);
                                            }}
                                            error={!!errors.plaque}
                                            helperText={errors.plaque}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            id="floorNumber"
                                            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required
                                            label="طبقه"
                                            value={address.floorNumber}
                                            onChange={(e) => {
                                                handleFieldChange('floorNumber', e.target.value);
                                            }}
                                            error={!!errors.floorNumber}
                                            helperText={errors.floorNumber}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            id="postalCode"
                                            className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required
                                            label="کد پستی"
                                            value={address.postalCode}
                                            onChange={(e) => {
                                                handleFieldChange('postalCode', e.target.value);
                                            }}
                                            error={!!errors.postalCode}
                                            helperText={errors.postalCode}
                                        />
                                    </div>
                                </div>

                                {/* Add Alley Field */}
                                <div className="mb-6">
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        id="alley"
                                        className="bg-gray-50 border mb-10 border-gray-300 text-gray-900  mb-10 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        label="کوچه"
                                        value={address.alley}
                                        onChange={(e) => {
                                            handleAddressChange('alley', e.target.value);
                                        }}
                                        error={!!errors.alley}
                                        helperText={errors.alley}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions className="!pt-4 border-t border-t-gray-300 !justify-between">
                <Button
                    autoFocus
                    onClick={(e) =>
                        level === 1 ? handleClose() : setLevel(1)
                    }
                >
                    {level === 1 ? "انصراف" : "مرحله قبل"}
                </Button>
                <Button
                    variant="outlined"
                    color="success"
                    onClick={level === 1 ? checkLocation : save}
                    autoFocus
                    disabled={
                        (coordinates.latitude === "35.65326" &&
                            coordinates.longitude === "51.354710000000004") &&
                        (address.provinceId === 8 && address.cityId === 215)
                    }
                >
                    {isLoading ? (
                        <CircularProgress size={24} />
                    ) : (
                        level === 1 ? "مرحله بعد" : "ذخیره"
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
