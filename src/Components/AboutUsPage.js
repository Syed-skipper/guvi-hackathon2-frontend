import React from "react";
import NavBar from "./NavBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function aboutUs() {
  return (
    <>
      <NavBar />
      <Card sx={{ width: "fullWidth" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="700px"
            width="fullWidth"
            image="https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              CamRental
            </Typography>
            <Typography variant="h5" color="text.secondary">
              CamRental.com (formerly CamRental.com) is the one of the best
              online rental provider for photography, videography, lighting
              equipment and accessories in India. CamRental.com (formerly
              CamRental.com) is well known for dedication and Commitment
              towards services to customers across Delhi/NCR and also provides
              in-person pickups and returns to the customers. Founded in 2017 by
              Mr Chetan Kumar, In a medium to ease the renting of equipments for
              Photographers, Cinematographers and the media Industry,
              CamRental.com (formerly CamRental.com) has grown from a one-man
              operation in a spare bedroom to a company with team of experienced
              professionals who are dedicated towards providing best and hassle
              free services for all your renting needs. The Team of employees,
              experienced photo and video technicians, and the best customer
              service representatives in the industry makes us the best
              available option. CamRental.com (formerly CamRental.com) serves
              thousands of photographers and videographers annually, always
              while maintaining the values of our founder – share the best
              available equipment at its optimum quality, and educate and
              provide support to our customers to ensure they can achieve their
              goals regardless of experience level. We carry camera bodies and
              lenses almost in every format from every major manufacturer, and
              all the audio, lighting and support accessories needed to cover
              any kind of shoot, from a family holiday card to a commercial
              advertising job. All equipment available with us are frequently
              inspected for Technical errors to avoid any issues to the user
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default aboutUs;
