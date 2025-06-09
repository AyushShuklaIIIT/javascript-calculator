import Display from './Components/Display.jsx'
import Keys from './Components/Keys.jsx'
// eslint-disable-next-line no-unused-vars
import { calculatorContext } from './JS/contexts.js'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { evaluate } from 'mathjs'

function App() {
  const [formula, setFormula] = useState("0");
  const [brackets, setBrackets] = useState("");

  const isOperator = useCallback((ch) => {
    return (ch == '%' || ch == '/' || ch == '*' || ch == '-' || ch == '+');
  }, []);

  const evaluateFormula = useCallback(() => {
    if(isOperator(formula[formula.length - 1])) {
      setFormula(prevFormula => {
        prevFormula = prevFormula.slice(0, -1);
        return prevFormula;
      })
    }

    try {
      const result = evaluate(formula);
      setFormula(result.toString());
      setBrackets("");
    }
    catch(error) {
      alert(error);
    }
  }, [formula, isOperator]);

  const handleBrackets = useCallback(() => {
    if (
      !brackets ||
      (brackets[brackets.length - 1] == '(' && formula[formula.length - 1] == '(') ||
      isOperator(formula[formula.length - 1])
    ) {
      setBrackets(prevBrackets => prevBrackets + '(');
      setFormula(prevFormula => prevFormula + '(');
    }
     else {
      setBrackets(prevBrackets => prevBrackets.slice(0, -1));
      setFormula(prevFormula => prevFormula + ')');
    }
  }, [brackets, formula, isOperator]);

  const handleClick = useCallback((character) => {
    console.log(character);
    if (character === 'AC') {
      setFormula("0");
      setBrackets("");
    }

    else if (character == '( )') {
      handleBrackets();
    }

    else if (character == 'back') {
      setFormula(prevFormula => {
        const updated = prevFormula.slice(0, -1);
        return updated === '' ? '0': updated;
      })
    }

    else if (character == '=') {
      evaluateFormula();
    }

    else if(formula[formula.length - 1] == ')' && character == '(') {
      setFormula(prevFormula => {
        prevFormula = prevFormula + '*' + character;
        return prevFormula;
      })
    }

    else if (formula.length >= 1 && isOperator(formula[formula.length - 1]) && isOperator(character)) {
      setFormula(prevFormula => {
        prevFormula = prevFormula.slice(0, -1);
        return prevFormula + character;
      })
    }

    else {
      setFormula(prevFormula => {
        if (prevFormula == '0') {
          prevFormula = prevFormula.slice(0, -1);
        }
        prevFormula = prevFormula + character;
        return prevFormula;
      });
    }
  }, [formula, handleBrackets, isOperator, evaluateFormula]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if(key === 'Enter') {
        handleClick('=');
      }
      else if(key === 'Backspace') {
        handleClick('back');
      }
      else if(key === 'Escape') {
        handleClick('AC');
      }
      else if(key === '(' || key === ')') {
        handleClick('( )');
      }
      else if(/[0-9+\-*/%.]/.test(key)) {
        handleClick(key);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleClick])
  

  const contextValue = useMemo(() => ({ handleClick, formula }), [handleClick, formula]);

  return (
    <calculatorContext.Provider value={contextValue}>
      <div className='w-[440px] shadow/75 bg-[#0f1417] rounded-2xl scale-75 md:scale-100'>
        <Display></Display>
        <Keys></Keys>
      </div>
    </calculatorContext.Provider>
  )
}

export default App
