import {
    Switch,
    Route,
    BrowserRouter
} from "react-router-dom";
import {MainPage, NotFoundPage, PopularPage} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={MainPage} path="/"/>
                <Route exact component={PopularPage} path="/popular"/>
                <Route component={NotFoundPage} path="/*"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
