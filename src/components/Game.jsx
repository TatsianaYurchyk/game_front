import React from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Main.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

const socket = io.connect("https://game-api-eqjj.onrender.com");
// const socket = io.connect("http://localhost:7000");

const Game = () => {
	const { search } = useLocation();
	const navigate = useNavigate();
	const [params, setParams] = useState({ room: "", user: "" });
	const [users, setUsers] = useState([]);
	const [participants, setParticipants] = useState(0);

	useEffect(() => {
		const searchParams = Object.fromEntries(new URLSearchParams(search));
		setParams(searchParams);
		socket.emit("join", searchParams);
	}, [search]);

	useEffect(() => {
		socket.on("room", ({ data: { users } }) => {
			setParticipants(users.length);
			setUsers(users);
			console.log(users);
		});
	}, []);

	const leftRoom = () => {
		socket.emit("leftRoom", { params });
		navigate("/");
	};

	return (
    <Container>
		<div className={styles.wrap}>
		<div className="blockCenter">
			<div>{participants} users in this room. </div>

			<Button className={styles.btn_leave} onClick={leftRoom}>
				Leave the room
			</Button>
			<div className={styles.welcome}>
				{users.map((user) => (
					<p> Welcome to the game {user.name}!</p>
				))}
				{users.length < 2 ? "Waiting for another participant" : ""}
			</div>

			<h1 className="header">Tic-Tac-Toe</h1>
			<div class="play-area">
				<div id="block_0" class="block"></div>
				<div id="block_1" class="block"></div>
				<div id="block_2" class="block"></div>
				<div id="block_3" class="block"></div>
				<div id="block_4" class="block"></div>
				<div id="block_5" class="block"></div>
				<div id="block_6" class="block"></div>
				<div id="block_7" class="block"></div>
				<div id="block_8" class="block"></div>
			</div>
		</div>
		</div>

    </Container>
	);
  
};

export default Game;
