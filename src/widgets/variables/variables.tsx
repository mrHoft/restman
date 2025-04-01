'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useVariables from '~/entities/useVariables';

import styles from './variables.module.css';

interface VariablesItem {
  name: string;
  value: string;
}

const initialVariablesState: VariablesItem[] = [{ name: '', value: '' }];

export default function Variables() {
  const { getVariables, setAllVariables } = useVariables();

  const [variables, setVariables] = useState<VariablesItem[]>(initialVariablesState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedVariables = getVariables();
    if (storedVariables) {
      const transformedVariables = Object.entries(storedVariables).reduce<VariablesItem[]>((acc, [name, value]) => {
        if (name === '' && value === '') return acc;
        return [...acc, { name, value }];
      }, []);
      transformedVariables.push({ name: '', value: '' });
      setVariables(transformedVariables);
    }
  }, []);

  const handleAdd = () => setVariables(prev => [...prev, { name: '', value: '' }]);

  const variablesTable = useMemo(() => {
    const handleInputChange = (id: number, field: 'name' | 'value', value: string) => {
      const newVariables = variables.map((item, index) => {
        if (index === id) {
          return { ...item, [field]: value };
        }
        return item;
      });
      setVariables(newVariables);
      const result = createResult(newVariables);
      setAllVariables(result);
    };

    const handleRemove = (index: number) => {
      const newVariables = variables.filter((_, i) => i !== index);
      setVariables(newVariables);
      const result = createResult(newVariables);
      setAllVariables(result);
    };

    if (!isClient) {
      return null;
    }

    return (
      <>
        {variables.map((el, index) => (
          <div key={index} className={styles.variables__row}>
            <input
              type="text"
              placeholder="Name"
              value={el.name}
              onChange={e => handleInputChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Value"
              value={el.value}
              onChange={e => handleInputChange(index, 'value', e.target.value)}
            />
            <button onClick={() => handleRemove(index)}>
              <img src="/icons/cross.svg" alt="delete" />
            </button>
          </div>
        ))}
      </>
    );
  }, [variables, setVariables, isClient]);

  const createResult = useCallback(
    (items: VariablesItem[]) =>
      items.reduce<Record<string, string>>((acc, header) => {
        if (header.name === '' && header.value === '') return acc;
        acc[header.name] = header.value;
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
        <div className={styles.variables__button} onClick={handleAdd}>
          Add
        </div>
      </div>
    </div>
  );
}
