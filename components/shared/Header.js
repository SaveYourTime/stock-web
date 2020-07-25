import './header.less';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Icon } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const [active, setActive] = useState(pathname);

  return (
    <header>
      <Navbar>
        <Navbar.Header>
          <Link href="/">
            <a className="header" onClick={() => setActive('hst')}>
              <img src="/svg/logo.svg" />
            </a>
          </Link>
        </Navbar.Header>
        <Navbar.Body>
          <nav>
            <ResponsiveNav appearance="subtle" activeKey={active} onSelect={setActive}>
              <ResponsiveNav.Item
                icon={<Icon icon="line-chart" />}
                eventKey="/hst"
                renderItem={(item) => <Link href="/hst">{item}</Link>}
              >
                HST
              </ResponsiveNav.Item>
              <ResponsiveNav.Item
                icon={<Icon icon="bar-chart" />}
                eventKey="/top"
                renderItem={(item) => <Link href="/top">{item}</Link>}
              >
                TOP
              </ResponsiveNav.Item>
            </ResponsiveNav>
          </nav>
        </Navbar.Body>
      </Navbar>
    </header>
  );
};

export default Header;
