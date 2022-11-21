import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { RQSuperHeroPage } from "./components/RQSuperHero.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { ParallelQueriesPage } from "./components/ParallerlQueries.page";
import { RQSuperHeroesCustomPage } from "./components/RQSuperHeroes.Custom.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { DynamicParallelPage } from "./components/DynamicParallerl.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";

//create instance of query client and assign it to provider
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes-custom">
                  RQ Super Heroes Custom Hook
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/rq-super-heroes/:heroId">
              <RQSuperHeroPage />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes-custom">
              <RQSuperHeroesCustomPage />
            </Route>
            <Route path="/rq-parallel">
              <ParallelQueriesPage />
            </Route>
            <Route path="/rq-dynamic-parallel">
              <DynamicParallelPage />
            </Route>
            <Route path="/rq-dependent">
              <DependentQueriesPage email="vishwas@example.com" />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
