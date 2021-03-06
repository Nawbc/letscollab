import type { NextPage } from 'next';

import {
  Text,
  Box,
  Button,
  Title,
  Center,
  Image,
  Card,
  Group,
  Stack,
  Transition,
} from '@mantine/core';
import { useCallback, useRef, useState } from 'react';
import {
  ScrollContainer,
  ScrollPage,
  Animator,
  batch,
  Fade,
  MoveOut,
  StickyIn,
  FadeIn,
  ZoomIn,
  MoveIn,
} from 'components/Scroll';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import RightArrow from 'components/RightArrow.json';
import { ScrollData } from 'components/Scroll/types';
import { FC } from 'react';
import { CSSProperties } from '@emotion/serialize';
import { TextParticle } from 'components';

const TransitionShape: FC<{
  mounted?: boolean;
  style?: CSSProperties;
  duration?: number;
}> = (props) => {
  return (
    <Transition
      mounted={props.mounted}
      transition="fade"
      duration={1000}
      timingFunction="ease"
    >
      {(styles) => (
        <Box
          style={{
            ...(props.style as any),
            ...styles,
          }}
        />
      )}
    </Transition>
  );
};

const Home: NextPage = () => {
  const ref = useRef<LottieRefCurrentProps>();

  const [showPage1Scrap, setPage1Scrap] = useState(false);

  const handlePage = useCallback(
    (event: ScrollData) => {
      switch (event.currentPage) {
        case 1:
          event.currentProgress < 0.2 && !showPage1Scrap && setPage1Scrap(true);
          break;
        default:
          break;
      }
    },
    [showPage1Scrap],
  );

  return (
    <ScrollContainer vHeight={3500} onScroll={handlePage}>
      <ScrollPage style={{ zIndex: 10 }} page={0}>
        <Center
          sx={{
            height: 'calc(100vh - 60px)',
            flexDirection: 'column',
            zIndex: 1,
          }}
        >
          <Animator animation={batch(Fade(), MoveOut(0, -500))}>
            <TextParticle
              text="letscollab"
              resolution={5}
              boxWidth={1800}
              boxHeight={400}
              size={300}
            />
          </Animator>
          <Button
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[6] + '!important',
            })}
            onMouseEnter={() => {
              ref.current.play();
            }}
            onMouseLeave={() => {
              ref.current.stop();
            }}
            rightIcon={
              <Lottie
                lottieRef={ref}
                style={{ width: 30 }}
                loop={false}
                animationData={RightArrow}
              />
            }
            radius="xl"
            size="xl"
            uppercase
          >
            ??????
          </Button>
        </Center>
      </ScrollPage>

      <ScrollPage page={1}>
        <Animator
          style={{ zIndex: 1 }}
          animation={batch(StickyIn(), FadeIn(), ZoomIn())}
        >
          <section style={{ whiteSpace: 'nowrap' }}>
            <Text
              align="center"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              style={{ fontSize: '110px' }}
              weight={700}
            >
              letscollab
            </Text>
            <Text align="center" style={{ fontSize: '60px' }} weight={700}>
              ??????????????????????????????????????????
            </Text>
          </section>
        </Animator>
        <TransitionShape
          mounted={showPage1Scrap}
          duration={1000}
          style={{
            borderRadius: 15,
            width: 160,
            height: 160,
            background: 'cyan',
            display: 'inline-block',
            position: 'absolute',
            top: 160,
            left: 200,
          }}
        />
        <TransitionShape
          mounted={showPage1Scrap}
          duration={1000}
          style={{
            borderRadius: 130,
            width: 130,
            height: 130,
            background: '#2AFF7C',
            display: 'inline-block',
            position: 'absolute',
            top: 360,
            right: 200,
          }}
        />
        <TransitionShape
          mounted={showPage1Scrap}
          duration={1000}
          style={{
            width: 0,
            height: 0,
            borderLeft: '80px solid transparent',
            borderRight: '80px solid transparent',
            borderTop: '140px solid #7B4DFA',
            position: 'absolute',
            bottom: 100,
            transform: 'rotate(45deg)',
            left: 500,
          }}
        />
        <TransitionShape
          mounted={showPage1Scrap}
          duration={1000}
          style={{
            width: 0,
            height: 0,
            borderLeft: '80px solid transparent',
            borderRight: '80px solid transparent',
            borderTop: '140px solid #7B4DFA',
            position: 'absolute',
            bottom: 100,
            transform: 'rotate(45deg)',
            left: 500,
          }}
        />
        <TransitionShape
          mounted={showPage1Scrap}
          duration={1000}
          style={{
            width: 120,
            height: 300,
            position: 'absolute',
            bottom: -150,
            background: '#E911A1',
            transform: 'rotate(45deg)',
            right: 500,
          }}
        />
      </ScrollPage>

      <ScrollPage page={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100%',
            textAlign: 'center',
            h4: {
              color: '#2C2C2C',
              fontWeight: 'unset',
            },
          }}
        >
          <Animator animation={MoveIn(0, 0)}>
            <Title order={3}>
              <Text
                inherit
                component="span"
                align="center"
                style={{ fontSize: '65px' }}
                weight={700}
                color="#EB167A"
              >
                letscollab
              </Text>
              <Text
                inherit
                component="span"
                align="center"
                variant="gradient"
                gradient={{ from: '#d111e9', to: '#bfb715', deg: 45 }}
                style={{ fontSize: '60px' }}
                weight={700}
              >
                ??????????????? ?
              </Text>
            </Title>
          </Animator>

          <Animator animation={MoveIn(-1000, 0)}>
            <h2>?????????</h2>
            <h4>??????????????????????????????????????????????????????????????????????????????</h4>
            <h4>
              letscollab pro
              ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
            </h4>
          </Animator>
          <Box sx={{ height: 5 }} />
          <Animator animation={MoveIn(1000, 0)}>
            <h2>???????????????</h2>
            <h4>
              letscollab??????????????????????????????????????????????????????????????????????????????
            </h4>
            <h4>????????????????????????????????????Geek?????????????????????</h4>
          </Animator>
          <Animator animation={MoveIn(-2000, 0)}>
            <h2>??????</h2>
            <h4>?????? letscollab ???????????????????????????????????????</h4>
            <h4>
              ???????????????????????????????????????????????????????????????????????????
              ????????????????????????
            </h4>
          </Animator>
        </Box>
      </ScrollPage>

      <ScrollPage page={3}>
        <Center sx={{ height: '100%' }}>
          <Stack mt={200} align="center">
            <Group
              position="center"
              sx={{
                // height: '100%',
                h4: {
                  color: '#2C2C2C',
                  fontWeight: 'unset',
                },
              }}
            >
              <Animator animation={batch(FadeIn(), MoveIn(-200, 0))}>
                <Card sx={{ width: 340 }} mr={40} shadow="md" p="lg">
                  <Image
                    src="/logo.svg"
                    fit="contain"
                    height={100}
                    alt="letscollab"
                  />

                  <Text weight={600} size="lg">
                    letscollab
                  </Text>

                  <Text
                    size="sm"
                    style={{ color: '#000', lineHeight: 1.5, height: 65 }}
                    lineClamp={3}
                  >
                    The management platform for independent projects makes it
                    easier for independent developers to generate revenue.
                  </Text>

                  <Button variant="light" color="cyan" fullWidth mt={14}>
                    ??????
                  </Button>
                </Card>
              </Animator>
              <Animator animation={batch(FadeIn(), MoveIn(200, 0))}>
                <Card sx={{ width: 340 }} ml={40} shadow="md" p="lg">
                  <Image
                    src="/nawb.svg"
                    fit="contain"
                    height={100}
                    alt="nawb"
                  />

                  <Text weight={600} size="lg">
                    Nawb
                  </Text>

                  <Text
                    size="sm"
                    style={{ color: '#000', lineHeight: 1.5, height: 65 }}
                  >
                    Mystery
                  </Text>

                  <Button variant="light" color="blue" fullWidth mt={14}>
                    ??????
                  </Button>
                </Card>
              </Animator>
            </Group>

            <Animator animation={Fade()}>
              <Title mt={80} order={3}>
                <Text
                  inherit
                  component="span"
                  align="center"
                  style={{ fontSize: '60px' }}
                  weight={700}
                >
                  ??????
                </Text>
                <Text
                  inherit
                  component="span"
                  align="center"
                  variant="gradient"
                  gradient={{ from: '#111111', to: '#857C7C', deg: 45 }}
                  style={{ fontSize: '65px' }}
                  weight={700}
                >
                  deskbtm !
                </Text>
              </Title>
            </Animator>
          </Stack>
        </Center>
      </ScrollPage>
    </ScrollContainer>
  );
};

export default Home;
