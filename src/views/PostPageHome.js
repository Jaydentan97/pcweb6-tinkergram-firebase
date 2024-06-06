import React, { useEffect, useState } from "react";
import { Container, Image, Nav, Navbar, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
                    <Navbar.Brand href="/">
                        <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '0.5rem' }} />
                        RRRSell
                    </Navbar.Brand>
                    <Nav>
                        <Link to="/add">
                            <Button style={{ backgroundColor: 'red', borderColor: 'red' }}>New Posting</Button>
                        </Link>
                        <Link to="/feedback">
                            <Button>Customer Feedback</Button>
                        </Link>
                        <Link to="/inbox">
                            <Button variant="link">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </Button>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="bg-custom text-black">
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
        <Container 
          style={{
          width: "12rem",
          marginLeft: "1rem",
          marginTop: "0rem",
      }}>
            <Link
                to={`post/${id}`}
                style={{
                    width: "12rem",
                    marginLeft: "1rem",
                    marginTop: "0rem",
                }}
            >
                <Image
                    src={image}
                    style={{
                        objectFit: "cover",
                        width: "10rem",
                        height: "10rem",
                        marginLeft: "-1rem",
                    }}
                />
            </Link>
            <div>
                <p style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>{caption}</p> {/* Smaller font size and reduced margin */}
                <p style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>Condition: {condition}</p> {/* Smaller font size and reduced margin */}
                <p style={{ fontSize: '0.8rem', margin: '0.2rem 0' }}>Price: {price}</p> {/* Smaller font size and reduced margin */}
            </div>
        </Container>
    );
}
