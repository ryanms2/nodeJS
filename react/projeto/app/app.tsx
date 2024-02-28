import { useState } from "react";
import "./App.css";

//estudo TypeScript  ------

type TypographyProps = {
  children: React.ReactNode;
  size?: "small" | "large";
};

type ParagraphProps = {
  color: string;
};

const Paragraph = ({
  children,
  size,
  color,
}: TypographyProps & ParagraphProps) => {
  return (
    <h1
      style={{
        fontSize: size === "small" ? "1.5rem" : "3rem",
        color: color,
      }}
    >
      {children}
    </h1>
  );
};

const Title = ({ children, size }: TypographyProps) => {
  return (
    <h1
      style={{
        fontSize: size === "small" ? "1.5rem" : "3rem",
      }}
    >
      {children}
    </h1>
  );
};

const titleDefaultProps = {
  size: "small",
};

Title.defaultProps = titleDefaultProps;

const user = {
  id: 1,
  name: "John Doe",
  age: 30,
  isAdmin: true,
  birthDate: new Date("1980-01-01"),
};

type UserAttributes = typeof user;

function sumNumbers(a: number, b: number) {
  return a + b;
}

function List<ItemType>({
  items,
  render,
}: {
  items: ItemType[];
  render: (item: ItemType, index: number) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => {
        return render(item, index);
      })}
    </ul>
  );
}

function App() {
  const [count, setCount] = useState<number | null>(null);

  if (count !== null) {
    return <div>{count}</div>;
  }

  const items = [
    {
      code: 1,
      name: "John Doe",
    },
    {
      code: 2,
      name: "Jane Doe",
    },
  ];

  return (
    <div className="App">
      <Title>
        <span>
          Hello <b>World</b>
        </span>
      </Title>

      <Paragraph color="red" size="small">
        Eu sou um parágrafo
      </Paragraph>

      <List
        items={items}
        render={(item, index) => {
          if (item.code === 1) {
            return <p>{item.name}</p>;
          }

          return <h3>{item.name}</h3>;
        }}
      />
    </div>
  );
}

export default App;