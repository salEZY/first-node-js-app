// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();

const profiles = {
  sale: {
    image: "/images/alexbo.jpg",
    name: "aleksandar bobic",
    company: "self",
    languages: ["js", "java", "c++"]
  },
  sjobs: {
    image: "/images/jobs.jpg",
    name: "steve jobs",
    company: "apple",
    languages: ["lopov", "kapitalista", "smetlar"]
  },
  bgates: {
    image: "/images/gates.jpg",
    name: "bill gates",
    company: "microsoft",
    languages: ["c", "c#", "java"]
  }
};

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get("/", (req, res) => {
  res.render("index", {
    text:
      "This is the dynamic data. Open index.js from the routes directory to see."
  });
});

router.get("/profiles", (req, res) => {
  res.render("profiles", null);
});

router.post("/addprofile", (req, res) => {
  const body = req.body;
  body["languages"] = req.body.languages.split(", ");

  profiles[body.username] = body;
  res.redirect("/profile/" + body.username);
});

router.get("/query", (req, res) => {
  const name = req.query.name;
  const occupation = req.query.occupation;

  const data = {
    name: name,
    occupation: occupation
  };

  res.render("profile", data);
});

router.post("/post", (req, res) => {
  const body = req.body;

  res.json({
    conformation: "success",
    data: body
  });
});

router.get("/:profile/:username", (req, res) => {
  const profile = req.params.profile;
  const username = req.params.username;
  const currentProfile = profiles[username];

  if (currentProfile == null) {
    res.json({
      conformation: "fail",
      message: `Profile ${username} not found`
    });
  }

  res.render("profile", currentProfile);
});

module.exports = router;
