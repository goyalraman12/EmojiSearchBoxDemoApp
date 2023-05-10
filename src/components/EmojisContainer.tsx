import React, { ChangeEvent, useEffect, useState } from "react";
import data from "../json/data.json";
import classes from "./EmojisContainer.module.css";

interface EmojiType {
  title: string;
  symbol: string;
  keywords: string;
}

const EmojisContainer = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [filteredEmojis, setFilteredEmojis] = useState<EmojiType[]>(data);

  const filterHandler = (val: string) => {
    if (val) {
      const tempEmojisData = JSON.parse(JSON.stringify(data));
      const emojisToDispay = tempEmojisData?.filter(
        (emoji: EmojiType) =>
          emoji?.keywords?.toLowerCase()?.indexOf(val?.toLowerCase()) > -1 ||
          emoji?.title?.toLowerCase()?.indexOf(val?.toLowerCase()) > -1 ||
          emoji?.symbol?.toLowerCase()?.indexOf(val?.toLowerCase()) > -1
      );
      setFilteredEmojis(emojisToDispay);
    } else {
      setFilteredEmojis(data);
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e?.target?.value);
  };

  const emojiClickHandler = (emoji: EmojiType) => {
    setInputVal(emoji?.symbol);
    filterHandler(emoji?.symbol);
  };

  useEffect(() => {
    setFilteredEmojis(data);
  }, []);

  return (
    <>
      <div className={classes.container}>
        <h3>😍 Emoji Search 😍</h3>

        <div>
          <div className={classes.inputButtonDiv}>
            <input
              placeholder="Search Emoji"
              value={inputVal}
              onChange={inputChangeHandler}
            />
            <button
              onClick={() => {
                filterHandler(inputVal);
              }}
            >
              Search
            </button>
          </div>

          <div className={classes.emojisBox}>
            {filteredEmojis.map((emoji: EmojiType, index: number) => {
              return (
                <span
                  key={index}
                  className={classes.emoji}
                  onClick={() => {
                    emojiClickHandler(emoji);
                  }}
                >
                  {emoji?.symbol}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmojisContainer;
