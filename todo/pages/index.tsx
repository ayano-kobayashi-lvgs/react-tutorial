import React, { useState } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Index: NextPage = () => {
  // 型定義======
  type Todo = {
    id: number;
    title: string;
    editMode: boolean;
    enabled: boolean;
  }

  // サンプル=======
  const sampleTodoList = [
    { id: 0, title: 'React参考書読む', editMode: false, enabled: true },
    { id: 1, title: 'Laravel環境構築', editMode: false, enabled: true },
    { id: 2, title: 'インフラ勉強', editMode: false, enabled: true },
  ];

  // 状態管理=======
  const [todoList, setTodoList] = useState<Todo[]>(sampleTodoList);
  const [inputText, setInputText] = useState('');
  const [editText, setEditText] = useState('');
  const [flashMessages, setFlashMessages] = useState({ todoTitle: '', message: '' });

  // 表示モード切り替え=======
  const enableEditState = (id: number) => {
    setTodoList(todoList.map((todo) => todo.id === id ? { id: todo.id, title: todo.title, editMode: true, enabled: todo.enabled } : todo));
  }
  const disableEditState = (id: number) => {
    setTodoList(todoList.map((todo) => todo.id === id ? { id: todo.id, title: todo.title, editMode: false, enabled: todo.enabled } : todo));
  }

  // 追加・取消の表示切り替え========
  const [buttonState, setButtonState] = useState('plus');
  const enableMinusButton = () => {
    setButtonState('minus');
  }
  const enablePlusButton = () => {
    setButtonState('plus');
  }

  // 登録処理=======
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }
  // IDの自動連番
  let nextId = todoList.length;

  const addTodo = () => {
    const newTodo: Todo = {
      id: nextId,
      title: inputText,
      editMode: false,
      enabled: true,
    }
    setTodoList([...todoList, newTodo]);
    setFlashMessages({ todoTitle: newTodo.title, message: 'が登録されました！' });
    setInputText('');
    nextId++;
    console.log(todoList);
  };

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  }

  // 更新処理=======
  const updateTodo = (id: number) => {
    setTodoList((prevTodo) => prevTodo.map((todo) => todo.id === id ? { id: todo.id, title: editText, editMode: false, enabled: todo.enabled } : todo));
    setFlashMessages({ todoTitle: editText, message: 'が更新されました！' });
    setEditText('');
  }

  // 削除処理=======
  const disableTodo = (id: number, title: string) => {
    const todoTitle = title;
    setTodoList(todoList.map((todo) => todo.id === id ? { id: todo.id, title: todo.title, editMode: todo.editMode, enabled: false } : todo));
    setFlashMessages({ todoTitle: todoTitle, message: 'が削除されました！' });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TODO</title>
        <meta name="description" content="これはTODO作成アプリです。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <p>TODOリスト</p>
      </header>
      <main className={styles.main}>
        {buttonState === 'plus' ?
          <div>
            <button onClick={enableMinusButton}>追加</button>
          </div>
          :
          <div>
            <button onClick={enablePlusButton}>取消</button>
          </div>
        }
        {(flashMessages) && <p>{flashMessages.todoTitle}{flashMessages.message}</p>}
        {(buttonState === 'minus') &&
          <div>
            <p>登録フォーム</p>
            <form>
              <input
                type="text"
                value={inputText}
                onChange={handleChangeInput}
                required />
              <button
                disabled={inputText === ""}
                onClick={addTodo}>
                登録
              </button>
            </form>
          </div>
        }
        <div>
          <table>
            <thead>
              <tr>
                <th>タイトル</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((todo) => todo.enabled &&
                <tr key={todo.id}>
                  {(todo.editMode) ?
                    <>
                      <td colSpan={3}>
                        <form
                          id="update"
                          action="">
                          <input
                            type="text"
                            value={editText}
                            onChange={handleChangeEdit}
                            required />
                        </form>
                        <button
                          disabled={editText === ""}
                          form="update"
                          onClick={(e) => updateTodo(todo.id)}>
                          更新
                        </button>
                        <button
                          onClick={(e) => disableEditState(todo.id)}>
                          取り消し
                        </button>
                      </td>
                    </>
                    :
                    <>
                      <td>{todo.title}</td>
                      <td>
                        <button
                          onClick={(e) => enableEditState(todo.id)}>
                          編集
                        </button>
                      </td>
                      <td>
                        <button onClick={(e) => disableTodo(todo.id, todo.title)}>削除</button>
                      </td>
                    </>
                  }
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main >
      <footer>
        <div>
          詳しくは
          <a href="/todo/details">こちら</a>
          をクリックしてください。
        </div>
      </footer>
    </div >
  );
};

export default Index;
