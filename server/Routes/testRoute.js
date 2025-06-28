app.get("/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg");
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});