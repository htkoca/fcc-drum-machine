// libraries
import React from '~/react';
import ReactDom from '~/react-dom';

// components
import App from '@/js/components/App';

// css
import '@/css/index';
import '@/data/quotes.json';

// render app
ReactDom.render(<App /> ,document.getElementById('react-root'));