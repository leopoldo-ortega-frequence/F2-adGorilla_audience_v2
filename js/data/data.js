export const createAudienceData = (interests) => {
  const data = [];

  interests.forEach((i) => {
    const tempObj = {};
    tempObj["interest"] = i;
    tempObj["industry"] = Math.floor(Math.random() * 90) + 10;
    tempObj["audience"] = Math.floor(Math.random() * 90) + 10;
    tempObj["size"] = Math.floor(Math.random() * 7) + 3;
    data.push(tempObj);
  });
  return data;
};

export const createWebsiteList = (list, categories) => {
  const data = [];
  const randLength = Math.floor(Math.random() * (list.length - 10)) + 10;
  const slicedList = list.slice(0, randLength);
  slicedList.forEach((i) => {
    const randCatIdx = Math.floor(Math.random() * categories.length + 1);
    const temp = {};
    temp["name"] = i;
    temp["categories"] = categories.slice(0, randCatIdx);
    data.push(temp);
  });

  return data;
};
