import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import MainLayout from './Layouts/MainLayout';
import { Fragment } from 'react';
import Product from './pages/ProductDetail';
import ProductDetail from '~/components/ProductDetail';

function App() {
    return (
        <Router>
            <div className="App" style={{ backgroundColor: '#f6f6f6', height: '100%' }}>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = MainLayout;

                        if (route.component === Product) {
                            return (
                                <Route
                                    key={index}
                                    path="/product/:nameproduct"
                                    element={
                                        <Layout>
                                            <ProductDetail />
                                        </Layout>
                                    }
                                />
                            );
                        }

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
