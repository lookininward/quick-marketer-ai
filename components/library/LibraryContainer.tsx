import classNames from 'classnames';
import { Badge } from '../ui/badge';
import { PlatformEnum } from '@/types/platform';

function LibraryContainer() {
    return (
        <div className={classNames(
            'flex flex-col gap-y-4',
            'justify-center items-start',
        )}>
            {[...Array(Math.floor(Math.random() * 10) + 3)].map((_, index) => (
                <div key={index} className={classNames(
                    "w-full p-4",
                    "flex",
                    "border",
                    "rounded-md",
                    "hover:bg-gray-100",
                    "transition",
                    "cursor-pointer",

                )}>
                    <div className='flex flex-col gap-y-1'>
                        <h3 className='whitespace-nowrap'>Project {index + 1}</h3>
                        <p className="text-sm max-w-xl">
                            {Array(Math.floor(Math.random() * 3) + 1).fill('lorem ipsum dolor sit amet, consectetur adipiscing elit.').join(' ')}
                        </p>
                    </div>

                    <div className='flex items-start flex-wrap gap-1 max-w-sm ml-auto'>
                        {[...Array(Math.floor(Math.random() * 6) + 1)].map((_, index) => (
                            <Badge key={index}>
                                {Object.values(PlatformEnum)[Math.floor(Math.random() * Object.values(PlatformEnum).length)]}
                            </Badge>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LibraryContainer