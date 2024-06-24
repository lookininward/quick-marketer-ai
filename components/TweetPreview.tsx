import Image from 'next/image';
import dayjs from 'dayjs';

const TweetPreview = ({
    user = 'User',
    handle = 'handle',
    content = 'Content',
    time = 1726874692,
    profileImage = 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hashTags = ['AI', '#Fintech', '#Innovation', '#FullStackDev'],
    image = 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
}: {
    user: string;
    handle: string;
    content: string;
    time: number; // timestamp
    profileImage: string;
    hashTags: string[];
    image: string;
}) => {
    return (
        <div className="border rounded-lg p-4 max-w-md mx-auto my-4 bg-white">
            <div className="flex items-center">
                <Image
                    src={profileImage}
                    alt={`${user}'s profile`}
                    className="rounded-full w-12 h-12 mr-4"
                    width={48}
                    height={48}
                />
                <div className="flex flex-col">
                    <span className="font-bold">{user}</span>
                    <span className="text-gray-500 text-sm">@{handle}</span>
                </div>
            </div>
            <div className="mt-4">
                <p>{content}</p>
            </div>
            {/* hashtags */}
            <div className="mt-4">
                {hashTags.map((tag) => (
                    <span key={tag} className="text-blue-500 text-xs mr-2">
                        {tag}
                    </span>
                ))}
                <div className="text-gray-500 text-xs mt-4">
                    {/* time */}
                    {dayjs.unix(Number(time)).format('MMMM D, YYYY')}
                </div>

            </div>
        </div>
    );
};

export default TweetPreview;
