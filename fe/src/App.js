import { Flex } from '@chakra-ui/react';
import './App.css';
import { SuggestionForm } from './components/Suggestions/SuggestionForm'
import { Navigation } from './components/Navbar/Navbar.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './components/InfoPages/NotFound';
import { AllSuggestions } from './components/Suggestions/AllSuggestions';
import { SingleSuggestion } from './components/Suggestions/SingleSuggestion';
import { IntroPage } from './components/InfoPages/IntroPage';
import { ContactPage } from './components/InfoPages/ContactPage';


function App(){
    return (
        <Flex 
            direction='column' 
            h="100vh"
        >
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/create" element={<SuggestionForm />} />
                    <Route path="/suggestions" element={<AllSuggestions />} />
                    <Route path="/suggestions/:id" element={<SingleSuggestion />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Flex>
    )
}

export default App;