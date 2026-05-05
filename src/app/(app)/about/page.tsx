"use client";
import Image from "next/image";
import styles from "../page.module.css";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  const divideCountByTwo = () => {
    setCount(count / 2);
  };

  const multiplyCountByTwo = () => {
    setCount(count * 2);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div>this is the count : {count}</div>
        <button onClick={increaseCount}>this is the button for increase</button>
        <button onClick={decreaseCount}>this is the button for decrase</button>
        <button onClick={divideCountByTwo}>
          thsi is the button for divide the count by two
        </button>
        <button onClick={multiplyCountByTwo}>
          thsi is the button for multiply the count by two
        </button>
        this is the about page.
      </main>
    </div>
  );
}
