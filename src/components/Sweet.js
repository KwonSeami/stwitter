import { dbService } from "firebaseJS";
import React, { useState } from "react";

const Sweet = ({sweetObj, isOwner}) => {
  const [edit, setEdit] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

  const onDeleteClick = () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if(ok) {
      dbService.doc(`sweets/${sweetObj.id}`).delete();
    }
  };
  const toggleEdit = () => setEdit(prev => !prev);
  const onSubmit = async(e) => {
    e.preventDefault();
    await dbService.doc(`sweets/${sweetObj.id}`).update({
      text: newSweet,
    });
    setEdit(false);
  };
  const onChange = (e) => {
    const {
      target: {value},
    } = e;
    setNewSweet(value);
  };

  return (
    <div>
      {edit? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="스윗을 수정하세요"
              value={newSweet}
              onChange={onChange}
              required
            />
            <input
              type="submit"
              value="수정"
            />
          </form>
          <button
            onClick={toggleEdit}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {isOwner && (
            <>
              <button
                onClick={onDeleteClick}
              >
                스윗 삭제
              </button>
              <button
                onClick={toggleEdit}
              >
                스윗 수정
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;