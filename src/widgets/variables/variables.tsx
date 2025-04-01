'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useVariables from '~/entities/useVariables';

import styles from './variables.module.css';

const initialVariablesState = [{ '': '' }];

export default function Variables() {
  const { setVariable, getVariables, setAllVariables } = useVariables();

  const [variables, setVariables] = useState<Record<string, string>[]>(initialVariablesState);

  useEffect(() => {
    const storedVariables = getVariables();
    console.log(storedVariables);
    if (storedVariables) {
      const newVariables = Object.entries(storedVariables).map(([name, value]) => ({ [name]: value }));

      console.log(newVariables);
      setVariables(() => [...newVariables, { '': '' }]);
    }
  }, []);

  const handleAdd = () => setVariables(prev => [...prev, { '': '' }]);

  const variablesTable = useMemo(() => {
    const handleNameChange = (i: number, varuableValue: string, value: string) => {
      const newvariables = [...variables];
      newvariables[i] = { [value]: varuableValue };
      setVariables(() => newvariables);

      const result = createResult(newvariables);
      setAllVariables(result);
    };

    const handleValueChange = (i: number, name: string, value: string) => {
      setVariable(name, value);
      const newVariables = [...variables];
      newVariables[i] = { [name]: value };
      setVariables(() => newVariables);
    };

    const handleRemove = (index: number) => {
      const newVariables = variables.filter((_, i) => i !== index);
      setVariables(newVariables);
      const result = createResult(newVariables);
      setAllVariables(result);
    };

    return (
      <>
        {variables.map((el, index) => {
          const name = Object.keys(el)[0];
          const value = Object.values(el)[0];
          return (
            <div key={index} className={styles.variables__row}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => handleNameChange(index, value, e.target.value)}
              />
              <input
                type="text"
                placeholder="Value"
                value={value}
                onChange={e => handleValueChange(index, name, e.target.value)}
              />
              <button className={styles.variables__remove} onClick={() => handleRemove(index)}>
                <img src="/icons/cross.svg" alt="delete" />
              </button>
            </div>
          );
        })}
      </>
    );
  }, [variables, setVariables]);

  const createResult = useCallback(
    (items: Record<string, string>[]) =>
      items.reduce<Record<string, string>>((acc, item) => {
        const name = Object.keys(item)[0];
        if (name === '') return acc;
        acc[name] = item[name];
        return acc;
      }, {}),
    []
  );

  return (
    <div className={styles.variables}>
      <h3 className={styles.variables__title}>Variables</h3>
      {variablesTable}
      <div className={styles.variables__row}>
        <div className={styles.variables__item}></div>
        <div className={styles.variables__add} onClick={handleAdd}>
          Add
        </div>
      </div>
    </div>
  );
}
