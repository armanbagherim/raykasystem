import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import AddToHomeScreen from "@/app/components/AddToHomeScreen/AddToHomeScreen";
import MainSlider from "../components/HomePageBuilder/MainSlider";
import CategorySlider from "../components/HomePageBuilder/CategorySlider";
import Brands from "../components/HomePageBuilder/Brands";
import BannerGenerator from "../components/HomePageBuilder/BannerGenerator";
import * as _ from "lodash";
import Categories from "../components/HomePageBuilder/Categories";

async function getData(link) {
  const res = await fetch(link, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const { result: homePageItems } = await getData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/ecommerce/homes`
  );

  const requestableItems = homePageItems.filter(
    (homePageItem) => homePageItem.requestBased == true
  );

  const items: {
    title: string;
    type: string;
    priority: number;
    totalLink?: string;
    fetchFunction: Promise<any>;
  }[] = requestableItems.map((requestableItem) => {
    return {
      title: requestableItem.title,
      type: requestableItem.type,
      priority: requestableItem.priority,
      totalLink: requestableItem.totalLink,
      fetchFunction: getData(requestableItem.link),
    };
  });

  const promises: Promise<any>[] = [];

  items.forEach((item) => {
    promises.push(item.fetchFunction);
  });

  const promiseResults = await Promise.all(promises);

  let finalRequestableResults = [];
  for (let index = 0; index < promiseResults.length; index++) {
    finalRequestableResults.push({
      data: promiseResults[index].result,
      title: items[index].title,
      priority: items[index].priority,
      totalLink: items[index].totalLink,
      type: items[index].type,
    });
  }
  const mergedList = _.concat(
    finalRequestableResults,
    homePageItems.filter((item) => item.requestBased == false)
  ).sort((first, second) => first.priority - second.priority);

  return (
    <>
      <AddToHomeScreen />

      {mergedList.map((renderItem) => {
        if (
          renderItem.type == "product" ||
          renderItem.type == "productCategory" ||
          renderItem.type == "productBrand"
        ) {
          return (
            <CategorySlider
              key={renderItem.priority}
              data={renderItem.data}
              name={renderItem.title}
              totalLink={renderItem.totalLink}
            />
          );
        } else if (renderItem.type == "amazing") {
          return (
            <div
              key={renderItem.priority}
              className="bg-primary py-10 mb-8 md:mb-20 bg-[url('/images/pattern.png')]"
            >
              <CategorySlider
                amazing
                data={renderItem.data}
                name={renderItem.title}
                totalLink={renderItem.totalLink}
              />
            </div>
          );
        } else if (renderItem.type == "brand") {
          return <Brands key={renderItem.priority} data={renderItem.data} />;
        } else if (renderItem.type == "category") {
          return (
            <Categories
              title={renderItem.title}
              data={renderItem.data}
              key={renderItem.priority}
            />
          );
        } else if (renderItem.type == "slider") {
          return (
            <MainSlider key={renderItem.priority} data={renderItem.items} />
          );
        } else if (renderItem.type == "banner") {
          return (
            <BannerGenerator
              key={renderItem.priority}
              data={renderItem.items}
            />
          );
        }
      })}
    </>
  );
}
