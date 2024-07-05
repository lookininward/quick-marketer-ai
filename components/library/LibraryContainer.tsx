import React from 'react'
import classNames from 'classnames';
import TextPreview from "@/components/TextPreview";
import FacebookPreview from "@/components/FacebookPreview";
import InstagramPreview from "@/components/InstagramPreview";
import ImagePreview from "@/components/ImagePreview";
import AudioPreview from "@/components/AudioPreview";
import VideoPreview from "@/components/VideoPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function LibraryContainer() {
    return (
        <div className={classNames(
            'flex flex-col gap-y-8',
            'justify-center items-start',
        )}>
            <Tabs defaultValue="text" className="w-full">
                <TabsList className='mb-8'>
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="facebook">Facebook</TabsTrigger>
                    <TabsTrigger value="instagram">Instagram</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="audio">Audio</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
                <TabsContent value="text">
                    <div className='flex flex-wrap gap-10 w-full justify-center items-center'>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index}>
                                <h3 className='text-lg font-semibold mb-2'>Text {index + 1}</h3>
                                <TextPreview />
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="email">
                    <div className='flex flex-wrap gap-4 w-full justify-center items-center'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <TextPreview key={index} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="facebook">
                    <div className='flex flex-wrap gap-4 w-full justify-center items-center'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <FacebookPreview key={index} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="instagram">
                    <div className='flex flex-wrap gap-4 w-full justify-center items-center'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <InstagramPreview
                                key={index}
                                imageUrl='https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                title='Instagram Post'
                                description='Check out our latest collection of summer essentials! From beachwear to accessories, we have everything you need to make a splash this season. 🌞🌊 #SummerVibes #BeachReady #FashionGoals'
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="image">
                    <div className='flex flex-wrap gap-4 w-full justify-center items-center'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <ImagePreview key={index} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="audio">
                    <div className='flex flex-wrap gap-4 w-full justify-center items-center'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <AudioPreview key={index} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="video">
                    <div className='flex flex-wrap gap-4 w-full justify-center items-center'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <VideoPreview key={index} />
                        ))}
                    </div>
                </TabsContent>

            </Tabs>


        </div>
    )
}

export default LibraryContainer