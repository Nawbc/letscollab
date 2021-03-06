import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from './use-menu';
import { DashboardLayout, loadableUserProfile } from '@letscollab/app-utils';
import { Anchor, Image } from '@mantine/core';
import { useAtom } from 'jotai';

export const Layout: FC<any> = function () {
  const menu = useMenu();

  console.log('-------- Layout Render --------');

  return (
    <DashboardLayout
      logoHref="/"
      logo={
        <Image src="/logo.svg" fit="contain" width="180px" alt="letscollab" />
      }
      logoWidth={180}
      menu={menu}
      nav={
        <>
          <Anchor
            to="/pro"
            target="_blank"
            underline={false}
            component={Link}
            reloadDocument={false}
            style={{ color: '#228be6', fontWeight: 700 }}
          >
            Switch Pro
          </Anchor>
        </>
      }
      navbarOpened={false}
    />
  );
};
