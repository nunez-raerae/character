import Nav from "./Nav";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "../App";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Search from "./Search";



const queryClient = new QueryClient();
function Body() {
  return (
    <>
      <Nav></Nav>
      <div className="container-fluid">
        <div style={{marginTop: '60px'}} className="card p-2 bg-secondary">
          <QueryClientProvider client={queryClient}>
            <LazyLoadComponent>
              <App></App>
              <Search></Search>
            </LazyLoadComponent>
          </QueryClientProvider>
        </div>
      </div>
    </>
  );
}

export default Body;
