const mustache = Mustache;
const loremText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non nisi est sit amet facilisis. Ac auctor augue mauris augue neque. Vitae aliquet nec ullamcorper sit. Nibh venenatis cras sed felis. Pharetra pharetra massa massa ultricies mi. Elit scelerisque mauris pellentesque pulvinar pellentesque.";
const slideInfoData = {
  header: "FIND YOUR AUDIENCE",
  description: () => {
    const randIdx = Math.floor(Math.random() * (loremText.length - 120) + 120);
    console.log(randIdx);

    return loremText.slice(0, randIdx);
  },
  page: Math.floor(Math.random() * 12),
  date: new Date().toLocaleString("en-us", { month: "long", year: "numeric" }),
};
const template = document.querySelector("#template").innerHTML;
const rendered = Mustache.render(template, { ...slideInfoData });
document.querySelector("#slide-left").innerHTML = rendered;
