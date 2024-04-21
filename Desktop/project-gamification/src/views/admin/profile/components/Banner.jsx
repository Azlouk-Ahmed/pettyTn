import React from "react";
import avatar from "assets/img/avatars/avatar11.png";
import avatarr from "assets/img/avatars/avatarSimmmple.png";
import Card from "components/card";
import { FcRating, FcRatings } from "react-icons/fc";

const Banner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center"  }}>
      <Card  extra={"w-[80%] h-full p-[2%] bg-cover flex mt-2" }>
        {/* Conteneur pour les deux divs */}
        <div
          className="flex h-[35vh]"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Background and profile */}
          <div
            className="flex w-[33%] items-center justify-center " 
            style={{
              backgroundImage: "none", // Supprimer l'image de fond existante
              borderRadius: '5%',
              background:"linear-gradient(90deg, rgba(56,68,244,1) 0%, rgba(56,78,244,1) 39%, rgba(184,0,255,1) 100%)",
            }}
          >
            <div>
              <img
                className="rounded-full "
                src={avatar}
                alt=""
                style={{width: '100%', height:'30vh', border:'5px solid gray '}}
              />
            </div>
          </div>

          {/* Name and position */}
          <div className="w-[96%]" style={{ padding: "0% 0% 0% 2%" }}>
            <div>
              <Card  extra={"w-[100%] h-full p-[2%] bg-cover  bg-gray-100 "}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className=", mt-1 w-[15%] ">
                    <img
                      className="h-[100%] w-[100%] rounded-full"
                      src={avatarr}
                      alt=""
                    />
                  </div>
                  <div className="w-[90%] ml-5">
                  <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    Jawaher Trabelsi
                  </h4>
                  <p className="text-base font-normal text-gray-600">
                    Full Stack Developer
                  </p>
                  <p>Niveau 1000</p>
                  </div>
                  
                </div>
              </Card>

              <div className=", ml-4 w-[90%]">
               <div  style={{
                    marginTop: "5%", marginLeft:'10%'}}>
               <div
                  className="flex-col, flex w-[100%] "
                  style={{

                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <FcRating className="mr-1 h-[5vh] w-[100%] " />
                  </div>
                  <div
                    className=" flex h-5 w-full items-center rounded-lg bg-lightPrimary dark:!bg-navy-700 "
                    style={{ height: "4vh", width: "75%" }}
                  >
                    <span
                      className="h-full w-2/5 rounded-lg  dark:!bg-white"
                      style={{ height: "4vh", backgroundColor: "#3844F4" }}
                    />
                  </div>
                  <div className="w-[15%]">500 / 1000</div>
                </div>
                <div
                  className="flex-col, flex w-[100%] "
                  style={{
                    marginTop: "2%",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <FcRatings className="mr-1 h-[5vh] w-[100%] " />
                  </div>
                  <div
                    className=" flex h-5 w-full items-center rounded-lg bg-lightPrimary dark:!bg-navy-700 "
                    style={{ height: "4vh", width: "75%" }}
                  >
                    <span
                      className="h-full w-2/3 rounded-lg dark:!bg-white"
                      style={{ height: "4vh", backgroundColor: '#b00ffb' }}
                    />
                  </div>
                  <div className="w-[15%]">500 / 1000</div>
                </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Banner;