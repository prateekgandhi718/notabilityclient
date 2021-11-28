
import Notes from './Notes';

const Home = (props) => {
    

    return (
        <div>

            <Notes showAlertProp = {props.showAlertProp} />

        </div>
    )
}

export default Home

/* Note that you're bringing this showAlertProp from App.js. Therefore from app.js to home.js and then again sending it to Notes.js. So, this is prop drilling and to save ourselves from this prop drilling we make use of ContextAPI. We could have used context API only but since we are only drilling it into 2 components it's okay.

*/