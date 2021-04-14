import { dbService } from "firebaseJS";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);
  const getSweets = async() => {
    const dbSweets = await dbService.collection("sweets").get();
    dbSweets.forEach((document) => {
      const sweetObj = {
        ...document.data(),
        id: document.id,
      }
      setSweets((prev) => [sweetObj, ...prev]);
    });
  };

  useEffect (() => {
    getSweets();
  }, []);

  const onSubmit = async(e) => {
    e.preventDefault();
    await dbService.collection("sweets").add({
      text: sweet, //sweet:sweet
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setSweet("");
  };
  const onChange = (e) => {
    const {
      target: {value}
    } = e;
    setSweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={sweet}
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={140}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Sweet"
        />
      </form>
      <div>
        {sweets.map((sweet) => (
          <div key={sweet.id}>
            <h4>{sweet.sweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;