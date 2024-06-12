import React, { useState } from "react";
import { 
  Container, 
  VStack, 
  HStack, 
  Input, 
  Button, 
  IconButton, 
  Text, 
  Checkbox 
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, text) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const handleUpdateTask = () => {
    setTasks(tasks.map(task => task.id === editTaskId ? { ...task, text: editTaskText } : task));
    setEditTaskId(null);
    setEditTaskText("");
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Enter a new task"
            value={editTaskId ? editTaskText : newTask}
            onChange={(e) => editTaskId ? setEditTaskText(e.target.value) : setNewTask(e.target.value)}
          />
          <Button onClick={editTaskId ? handleUpdateTask : handleAddTask}>
            {editTaskId ? "Update Task" : "Add Task"}
          </Button>
        </HStack>
        <VStack width="100%" spacing={2}>
          {tasks.map(task => (
            <HStack key={task.id} width="100%" p={2} borderWidth={1} borderRadius="md" justifyContent="space-between">
              <Checkbox isChecked={task.completed} onChange={() => handleToggleComplete(task.id)}>
                <Text as={task.completed ? "del" : undefined}>{task.text}</Text>
              </Checkbox>
              <HStack>
                <IconButton icon={<FaEdit />} onClick={() => handleEditTask(task.id, task.text)} />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;