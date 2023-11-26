import {Link} from 'react-router-dom'

function WelcomeComponent() {

    return (
        <div className="WelcomeComponent">
            <div>
                Manage your Expenses - <Link to="/expenses">Go here</Link>
            </div>
        </div>
    )
}

export default WelcomeComponent