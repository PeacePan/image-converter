import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const HomeViewWithNoSSR = dynamic(() => import('../src/views/home'), { ssr: false });
const HomePage: NextPage = () => <HomeViewWithNoSSR />;
export default HomePage;
