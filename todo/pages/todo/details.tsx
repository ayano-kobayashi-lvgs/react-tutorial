import React from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'

const Index: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>TODO</title>
                <meta name="description" content="これはTODO作成アプリの詳細です。" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <p>詳細です。</p>
                <p>
                    <a
                        href="../"
                        className={styles.link}>
                        戻る
                    </a>
                </p>
            </header>
        </div >
    );
};

export default Index;
