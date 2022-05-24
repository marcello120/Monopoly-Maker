import React from 'react'

const About = (props) => {

    const maker = () => {
        props.setPage('Maker')
    }


  return (
      <div className='aboutpage'>
    <div >Printopoly</div>
    <div>Create your own monopoly game!</div>

    <div className='neu'>

    <div cla>Printopoly is an online tool that lets you create custom monopoly boards. Choose the property names, color schemes, and even icons to make the experience truly unique. </div>
    <div>Our website lets you customize every aspect of your board, from the property names and look, to the Chance and Community Chest cards. You can even choose your own currency.</div>
    <div>Create the monopoly board fitting your exact idea and see your changes live as you make them in our instant preview mode.</div>
    <div>The site will generate a high res image of the monopoly board as well as the corresponding property cards, which can be downladed individaully or already grouped to fit and A4 page.</div>
    <div> Click the BUILD button to start creating your own board</div>

    <button onClick={maker} className='submitButton'>BUILD</button>


    {/* ad 1 */}
    <div>Looking to add a personal touch to your next game of Monopoly? Look no further than Printopoly! With our easy-to-use online tools, you can create a personalized board that is sure to make your next game night a hit!</div>

    {/* ad 2 */}
    <div>Whether you're looking to create a fun game for your family or friends, or you're looking for a unique gift, Printopoly is the perfect place for you!</div>

    <div>Upcoming features:</div>
    <div>Custom Money, Custom Community Chest and Chance Cards, 4K Board, </div>

    </div>
    </div>
    )
}

export default About