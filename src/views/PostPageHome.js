import { useEffect, useState } from "react";
import { Container, Image, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function PostPageHome() {
    const [posts, setPosts] = useState([]);

    async function getAllPosts() {
        const query = await getDocs(collection(db, "posts"));
        const posts = query.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setPosts(posts);
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    const ImagesRow = () => {
        return posts.map((post, index) => <ImageSquare key={index} post={post} />);
    };

    return (
        <>
            <Navbar variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/add">New Post</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <ImagesRow />
                </Row>
            </Container>
        </>
    );
}

function ImageSquare({ post }) {
    const { image, id, caption, condition, price } = post;
    return (
        <>
            <Link
                to={`post/${id}`}
                style={{
                    width: "12rem",
                    marginLeft: "1rem",
                    marginTop: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Image
                    src={image}
                    style={{
                        objectFit: "cover",
                        width: "12rem",
                        height: "12rem",
                    }}
                />
                <div>
                    <p>{caption}</p>
                    <p>Condition: {condition}</p> {/* Display condition */}
                    <p>Price: {price}</p> {/* Display price */}
                </div>
            </Link>
        </>
    );
}
