import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Nav, Icon } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';

const Header = () => {
  const [active, setActive] = useState('home');

  return (
    <header>
      <Navbar>
        <Navbar.Header>
          <Link href="/">
            <a style={{ padding: '18px 20px', display: 'inline-block' }}>STOCK</a>
          </Link>
        </Navbar.Header>
        <Navbar.Body>
          <nav>
            <ResponsiveNav appearance="subtle" activeKey={active} onSelect={setActive}>
              <ResponsiveNav.Item
                icon={<Icon icon="home" />}
                eventKey="home"
                renderItem={(item) => <Link href="/">{item}</Link>}
              >
                Home
              </ResponsiveNav.Item>
              <ResponsiveNav.Item
                icon={<Icon icon="newspaper-o" />}
                eventKey="news"
                renderItem={(item) => <Link href="/news">{item}</Link>}
              >
                News
              </ResponsiveNav.Item>
              <ResponsiveNav.Item
                icon={<Icon icon="cubes" />}
                eventKey="products"
                renderItem={(item) => <Link href="/products">{item}</Link>}
              >
                Products
              </ResponsiveNav.Item>
            </ResponsiveNav>
            <Nav pullRight>
              <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
            </Nav>
          </nav>
        </Navbar.Body>
      </Navbar>
    </header>
  );
};

export default Header;
