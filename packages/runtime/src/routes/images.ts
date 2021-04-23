import { Router } from "express";
import { BrandedImages } from "src/app";

export const getImageRoutes = (images: BrandedImages[]) => {
  const router = Router();
  router.get("/images", (req, res) => {
    res.send(
      images.map((image) => {
        return {
          id: image.id,
          logo: `/images/${image.id}/logo`,
          icon: `/images/${image.id}/icon`,
        };
      })
    );
  });
  router.get("/images/:id/logo", (req, res) => {
    const image = images.find((image) => image.id === req.params.id);
    if (image) {
      res.sendFile(image.logo);
    } else {
      res.status(404).send("Invalid Image Id");
    }
  });
  router.get("/images/:id/icon", (req, res) => {
    const image = images.find((image) => image.id === req.params.id);
    if (image) {
      res.sendFile(image.logo);
    } else {
      res.status(404).send("Invalid Image Id");
    }
  });
  return router;
};
