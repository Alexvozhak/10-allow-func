function allowFunc(func: (a: number) => boolean) {
  return (target: Object, propertyKey: string | symbol) => {
    let value: number = 0;

    const getter = () => value;
    // https://app.purpleschool.ru/courses/5/sections/10/lessons/96 Декоратор свойства
    // в этом уроке хорошо бы в явную проговорить, что value и getter - это обязательные вещи для переопределения setter

    const setter = (newValue: number) => {
      if (!func(newValue))
        throw new Error(`Число должно быть больше ${newValue}`);
      value = newValue;
    };
    Object.defineProperty(target, propertyKey, { set: setter, get: getter });
  };
}

class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
}

const person = new User();
console.log(person.age);

person.age = 0;
console.log(person.age);

person.age = 20;
console.log(person.age);
