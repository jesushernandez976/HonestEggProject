import React from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';

const About = () => {
  return (
    <>
      <div className='content'>
        <br />
        <Row>
          <Col md={12}>
            <div className='box'>
              <Image src='../images/logo.png' alt='antiques' fluid />
            </div>
            <div className='box'>
              <h1>About Us</h1>
              <p>
                Welcome to our antique store! We take pride in curating a
                collection of unique and timeless pieces that reflect the beauty
                of history. Our passion for antiques drives us to seek out
                treasures that carry stories from the past.
              </p>

              <p>
                At our store, you'll find a diverse range of exquisite
                furniture, artifacts, and memorabilia from different eras. Each
                item has been carefully selected to bring a touch of elegance
                and nostalgia to your home.
              </p>
            </div>

            <div className='box'>
              <h1>Various collecting</h1>
              <p>
                Our store houses a diverse collection of antiques, including
                items made from wood, stone, ceramics, and exquisite Asian
                artifacts. Each category offers unique pieces that resonate with
                different historical and cultural contexts.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className='box'>
              <h1>Wood and Stone</h1>
              <p>
                Our collection of wood and stone artifacts showcases the
                craftsmanship and enduring beauty of natural materials. Discover
                intricately carved wooden furniture and elegant stone sculptures
                that add a touch of rustic charm to any space.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className='box'>
              <h1>Ceramics</h1>
              <p>
                Delve into our selection of ceramics, featuring exquisite
                pottery, porcelain, and decorative ceramics from various
                cultures. Each piece tells a story of artistic expression and
                cultural heritage.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className='box'>
              <h1>Asian</h1>
              <p>
                Explore our collection of Asian antiques, encompassing a wide
                array of art, furniture, and artifacts from diverse Asian
                cultures. These items showcase the rich history and traditions
                of the continent.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className='box'>
              <h1>Favorite Collections</h1>
              <p>
                Our favorite collections include a curated selection of
                exceptional antiques that hold significant historical value and
                aesthetic appeal. Visit us to explore these remarkable pieces.
              </p>
            </div>
          </Col>
        </Row>

        <hr />
        <br />
        <Row>
          <Col md={6}>
            <Card>
              <Image src='../images/1a.jpg' alt='antiques' />
            </Card>
          </Col>
          <Col md={6}>
            <div className='box'>
              <h1>Our Mission</h1>
              <p>
                At our antique store, our mission is to preserve history and
                provide customers with a unique glimpse into the past through
                our carefully curated collection of antiques. We aim to offer
                exceptional pieces that bring joy and inspiration to our
                patrons.
              </p>
            </div>
          </Col>
        </Row>
        <br />
      </div>
    </>
  );
};

export default About;
