import Bowman from '../Bowman.js';
import Swordsman from '../Swordsman.js';
import Magician from '../Magician.js';
import Daemon from '../Daemon.js';
import Undead from '../Undead.js';
import Zombie from '../Zombie.js';
import Character from '../Character.js';

describe('Character базовый класс', () => {
  test('ошибка: имя слишком короткое', () => {
    expect(() => new Character('A', 'Bowman')).toThrow();
  });

  test('ошибка: имя слишком длинное', () => {
    expect(() => new Character('SuperLongName', 'Bowman')).toThrow();
  });

  test('ошибка: неверный тип', () => {
    expect(() => new Character('Hero', 'Unknown')).toThrow();
  });

  test('levelUp повышает характеристики', () => {
    const bowman = new Bowman('Hero');
    bowman.levelUp();
    expect(bowman.level).toBe(2);
    expect(bowman.attack).toBeCloseTo(25 * 1.2);
    expect(bowman.defence).toBeCloseTo(25 * 1.2);
    expect(bowman.health).toBe(100);
  });

  test('ошибка при levelUp, если персонаж мёртв', () => {
    const bowman = new Bowman('Hero');
    bowman.health = 0;
    expect(() => bowman.levelUp()).toThrow();
  });

  test('damage уменьшает здоровье', () => {
    const swordsman = new Swordsman('Hero');
    swordsman.damage(50);
    expect(swordsman.health).toBe(55);
  });

  test('damage не уходит ниже нуля', () => {
    const mag = new Magician('Mage');
    mag.damage(500);
    expect(mag.health).toBeGreaterThanOrEqual(0);
  });
});

describe('Дочерние классы', () => {
  test.each([
    [Bowman, 'Лучник', 25, 25],
    [Swordsman, 'Воин', 40, 10],
    [Magician, 'Маг', 10, 40],
    [Daemon, 'Демон', 10, 40],
    [Undead, 'Нежить', 25, 25],
    [Zombie, 'Зомби', 40, 10],
  ])(
    'создание экземпляра',
    (ClassType, name, attack, defence) => {
      const char = new ClassType(name);
      expect(char.name).toBe(name);
      expect(char.attack).toBe(attack);
      expect(char.defence).toBe(defence);
      expect(char.health).toBe(100);
      expect(char.level).toBe(1);
    },
  );
});