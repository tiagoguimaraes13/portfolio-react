import React from 'react';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {LanguageProvider,LanguageSwitcher} from './LanguageContext';
import {translateDemo} from './DemoLanguage';
import StudioCut from '../demos/StudioCut';
import FormStore from '../demos/FormStore';
import NordBuild from '../demos/NordBuild';
import OliveTable from '../demos/OliveTable';
beforeEach(()=>{localStorage.clear();window.scrollTo=jest.fn();HTMLElement.prototype.scrollIntoView=jest.fn();window.matchMedia=()=>({matches:true});});
afterEach(cleanup);
const renderDemo=Component=>render(<LanguageProvider><LanguageSwitcher/><Component/></LanguageProvider>);
function switchTo(language){fireEvent.change(screen.getAllByRole('combobox')[0],{target:{value:language}});}
test.each(['et','ru','fi'])('store keeps product variants and cart while switching to %s',language=>{
 renderDemo(FormStore);
 fireEvent.change(screen.getByLabelText('Finish',{selector:'#variant-mug'}),{target:{value:'Cream'}});
 fireEvent.click(screen.getByRole('button',{name:'Add morning mug to bag'}));
 switchTo(language);
 fireEvent.click(screen.getByRole('button',{name:`${translateDemo('Bag',language)} (1)`}));
 const quantity=screen.getByRole('combobox',{name:translateDemo('Quantity for {product}, {finish}',language,{product:translateDemo('Morning mug',language),finish:translateDemo('Cream',language)})});
 fireEvent.change(quantity,{target:{value:'2'}});
 expect(quantity).toHaveValue('2');
 switchTo('en');
 expect(screen.getByText('Morning mug')).toBeInTheDocument();
 expect(screen.getByRole('combobox',{name:'Quantity for Morning mug, Cream'})).toHaveValue('2');
});
test.each(['et','ru','fi'])('barber preserves selected service and booking step in %s',language=>{
 renderDemo(StudioCut);
 fireEvent.click(screen.getByRole('button',{name:'Choose signature cut'}));
 fireEvent.click(screen.getByRole('radio',{name:/Alex/}));
 switchTo(language);
 expect(screen.getByRole('radio',{name:/Alex/})).toBeChecked();
 fireEvent.click(screen.getByRole('button',{name:translateDemo('Continue',language)}));
 expect(screen.getByLabelText(translateDemo('Your preferred date',language))).toBeInTheDocument();
 switchTo('en');
 expect(screen.getByText(/Signature cut · 45 min/)).toBeInTheDocument();
});
test.each(['et','ru','fi'])('construction calculator uses canonical project values in %s',language=>{
 renderDemo(NordBuild);switchTo(language);
 fireEvent.change(screen.getAllByLabelText(translateDemo('Type of project',language))[0],{target:{value:'Extension'}});
 fireEvent.change(screen.getByLabelText(translateDemo('Finish level',language)),{target:{value:'Premium'}});
 fireEvent.click(screen.getByRole('button',{name:translateDemo('Use these details in my enquiry',language)}));
 expect(screen.getAllByLabelText(translateDemo('Project type',language)).at(-1)).toHaveValue('Extension');
 expect(screen.getByLabelText(translateDemo('Your project',language)).value).toContain(translateDemo('Extension',language));
 switchTo('en');expect(screen.getByLabelText('Project type')).toHaveValue('Extension');
});
test.each(['et','ru','fi'])('restaurant filter keeps matching dishes across %s',language=>{
 renderDemo(OliveTable);fireEvent.click(screen.getByRole('button',{name:'Something sweet'}));switchTo(language);
 expect(screen.getByRole('button',{name:translateDemo('Something sweet',language)})).toHaveAttribute('aria-pressed','true');
 expect(screen.getByRole('heading',{name:translateDemo('Olive oil cake',language)})).toBeInTheDocument();
 expect(screen.queryByRole('heading',{name:translateDemo('Roast chicken',language)})).not.toBeInTheDocument();
});
