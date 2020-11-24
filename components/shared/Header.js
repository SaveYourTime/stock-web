import './header.less';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Navbar, Icon, Modal, DateRangePicker } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';
import DateContext from '../../contexts/DateContext';

const Header = () => {
  const { setDateRange } = useContext(DateContext);
  const router = useRouter();
  const { pathname } = router;
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(pathname === '/' ? '/hst' : pathname);
  return (
    <header>
      <Navbar>
        <Navbar.Header className="header" onClick={() => setShow(true)}>
          <img src="/svg/logo.svg" />
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header>
          <Modal.Title>選擇查詢時間區間</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DateRangePicker
            onChange={([start, end]) => setDateRange({ start, end })}
            hoverRange="week"
            oneTap
            cleanable
            defaultOpen
            showOneCalendar
          />
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;
