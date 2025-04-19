import { APP_NAME, NAV_LINKS } from '@/app/constants';
import Link from 'next/link';

const Nav = () => {
  return (
    <header className="z-10 h-[54px] border-b-1 bg-darkish text-stone-300 shadow-sm">
      <nav className="flex justify-between items-center px-8">
        <div className="">
          <h3 className="mt-3 font-bold hover:text-white cursor-pointer">
            <Link href="/">{APP_NAME}</Link>
          </h3>
        </div>

        <div className="hidden sm:block">
          <ul className="flex justify-center items-center gap-8 text-stone-300">
            {NAV_LINKS.map((item) => (
              <li className="hover:text-white text-sm mt-3" key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
