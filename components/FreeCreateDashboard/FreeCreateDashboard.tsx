'use client';

import TweetPreview from "@/components/TweetPreview";
import OutputMenu from "@/components/OutputMenu";
import GenerateLoader from "@/components/GenerateLoader";
import FreeCreateSidebar from "@/components/FreeCreateDashboard/FreeCreateSidebar";
import { useFreeCreateContext } from "@/context/FreeCreateContext";
import { PlatformEnum } from "@/types/platform";
import NumGenerationsBar from "../NumGenerationsBar";
import TextPreview from "../TextPreview";
import FacebookPreview from "../FacebookPreview";
import InstagramPreview from "../InstagramPreview";
import ImagePreview from "../ImagePreview";
import AudioPreview from "../AudioPreview";
import VideoPreview from "../VideoPreview";

function FreeCreateDashboard() {
  const { isGenerating, selectedPlatform } = useFreeCreateContext();

  return (
    <div className="w-full flex justify-start items-start" >
      < FreeCreateSidebar />

      < div className="flex flex-col items-center justify-center w-full h-full">
        <NumGenerationsBar />

        <div className="flex flex-col items-center justify-center w-full h-full">
          {isGenerating ? (<GenerateLoader />) : (
            <>
              {selectedPlatform === PlatformEnum.Text && (
                <TextPreview />
              )}

              {selectedPlatform === PlatformEnum.Image && (
                <ImagePreview />
              )}

              {selectedPlatform === PlatformEnum.Email && (
                <TextPreview />
              )}

              {selectedPlatform === PlatformEnum.Audio && (
                <AudioPreview />
              )}

              {selectedPlatform === PlatformEnum.Video && (
                <VideoPreview />
              )}

              {selectedPlatform === PlatformEnum.Twitter && (
                <TweetPreview
                  user="User"
                  handle="handle"
                  content="🚀 Excited to announce our latest project! We're building an AI-driven platform that integrates seamlessly with popular fintech services to provide personalized financial insights. Stay tuned for updates!"
                  time={1726874692}
                  profileImage="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  hashTags={["AI", "#Fintech", "#Innovation", "#FullStackDev"]}
                  image="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                />
              )}

              {selectedPlatform === PlatformEnum.Instagram && (
                <InstagramPreview
                  imageUrl="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  title="Educational poster"
                  description="This is a poster that I made for my students to help them remember the different types of angles."
                />
              )}

              {selectedPlatform === PlatformEnum.Facebook && (
                <FacebookPreview />
              )}

              {selectedPlatform === PlatformEnum.LinkedIn && (
                <TextPreview />
              )}

              {selectedPlatform === PlatformEnum.BlogPost && (
                <TextPreview />
              )}

            </>
          )}

          <div className="mt-10 shadow-lg">
            <OutputMenu />
          </div>
        </div>
      </div >
    </div >
  )
}

export default FreeCreateDashboard