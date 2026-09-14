import { APP_NAME, APP_PATHS, LOGO_PATH } from '@/app/constants'
import Image from 'next/image'
import Link from 'next/link'
import Profile from '../Profile'

const NAV_LINKS = [
    {
        label: 'Pricing',
        href: APP_PATHS.PRICING,
    },
    {
        label: 'Blog',
        href: APP_PATHS.BLOG,
    },
    {
        label: 'Features',
        href: '/#features',
    },
    {
        label: 'Create Invoice',
        href: APP_PATHS.CREATE_INVOICE,
    },
]

export default function Header2() {
    return (
        <header className="border-b border-gray-100">
            {/* <div className="bg-yellow-100 text-yellow-800 text-center py-2 px-4">
        <span className="font-semibold">
          ⚠️ Site is under maintenance and may be unavailable for up to 24
          hours.
        </span>
      </div> */}
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <Link href={'/'}>
                    <div className="flex items-center space-x-0">
                        {/* <FileText className="h-8 w-8 text-emerald-600" /> */}
                        <div className="h-10 w-10 overflow-hidden flex items-center">
                            <Image
                                src={LOGO_PATH}
                                alt="logo"
                                width={2000}
                                height={2000}
                                className="h-full w-full scale-150 object-contain"
                            />
                        </div>                      <span className="hidden md:block text-xl font-bold text-gray-900">
                            {APP_NAME}
                        </span>
                    </div>
                </Link>
                <nav className="hidden sm:flex space-x-6">
                    {NAV_LINKS.map((item, index: number) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <Profile />
            </div>
        </header>
    )
}
