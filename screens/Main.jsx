import {
  View,
  Text,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelector, useDispatch } from "react-redux";
import { union, a1, a2, a3, a4 } from "../assets";
import { taskAdded, deleteAllTasks, toggleTasks } from "../redux/TodoSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AwesomeAlert from "react-native-awesome-alerts";
import React, { useState } from "react";
import * as Animate from "react-native-animatable";
////////////////////////////////////////////////////////////////////////////////////////////
// For genrating random id for the task object
const generateRandomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 8;
  let randomId = "";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
};

const Main = () => {
  // exmaple tasks
  const exampleTasks = [
    { id: 1, title: "Task 1", description: "Hello world 1" },
    { id: 2, title: "Task 2", description: "Hello world 2" },
    { id: 3, title: "Task 3", description: "Hello world 3" },
  ];

  ////////////////////////////////////////////////////////////////////////////////
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [individualTask, setIndividualTask] = useState({
    title,
    description,
  });

  const [showAlert, setShowAlert] = useState(false);
  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const { tasks } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Adding Task///////////////////////////////////////////////////////////////////////////////
  const addTask = () => {
    if (title === "" || description == "") {
      Alert.alert("PLease fill all the fields");
    } else {
      try {
        const task = {
          id: generateRandomId(),
          title: title,
          description: description,
        };
        dispatch(taskAdded(task));
        setTitle("");
        setDescription("");
        setModalVisible(!modalVisible);
        console.log(tasks);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Deleting all Tasks//////////////////////////////////////////////////////////////////
  const removeAllTasks = () => {
    setShowAlert(!showAlert);
  };

  return (
    <SafeAreaView className="flex-1 relative bg-[#ffffff] px-[25px]">
      <Animate.View
        animation="fadeInLeft"
        duration={600}
        className="mt-6 w-full justify-center items-center"
      >
        <Text className="font-[InterM] text-[#111322] text-2xl">
          Task Details
        </Text>
      </Animate.View>

      {individualTask.title == "" || individualTask.description == "" ? null : (
        <View className="flex-col space-y-4 mt-4">
          <Animate.Text
            animation="fadeInLeft"
            duration={600}
            className="text-2xl font-[InterM] text-[#5D6B98] "
          >
            Task Title
          </Animate.Text>
          <Animate.Text
            animation="fadeInRight"
            duration={600}
            className="text-3xl font-[InterSb] text-[#1D2939] "
          >
            {individualTask?.title}
          </Animate.Text>
          <Animate.Text
            animation="fadeInLeft"
            duration={600}
            className="text-2xl font-[InterM] text-[#5D6B98] "
          >
            Description
          </Animate.Text>
          <Animate.Text
            animation="fadeInRight"
            duration={600}
            className="text-xl font-[InterM] text-[#111322] "
          >
            {individualTask?.description}
          </Animate.Text>
          <Animate.View
            animation="fadeInRight"
            duration={600}
            className="w-full flex-row"
          >
            <Image source={a1} className="object-contain " />
            <Image source={a2} className="object-contain -ml-2" />
            <Image source={a3} className="object-contain -ml-2" />
            <Image source={a4} className="object-contain -ml-2" />
          </Animate.View>
        </View>
      )}
      <View className=" flex-row items-center justify-between w-full mt-[28px]">
        <Animate.Text
          animation="fadeInLeft"
          duration={600}
          className="text-2xl font-[InterM] text-[#5D6B98] "
        >
          TaskList
        </Animate.Text>
        <Animate.View animation="fadeInRight" duration={600}>
          <TouchableOpacity
            onPress={removeAllTasks}
            disabled={tasks?.length == 0 ? true : false}
          >
            <MaterialCommunityIcons name="trash-can" size={30} color="red" />
          </TouchableOpacity>
        </Animate.View>
      </View>
      <ScrollView className=" mt-2">
        {/* Task List */}
        {tasks?.map((task, i) => (
          <Animate.View animation="fadeInDown" key={i}>
            <TouchableOpacity
              onPress={() => {
                setIndividualTask({
                  ...individualTask,
                  title: task.title,
                  description: task.description,
                  completed: task.completed,
                });
                console.log(individualTask.title);
              }}
              className="w-[343px] h-[72px] flex-row  mt-[12px]  px-4  items-center bg-[#F9F9FB]  rounded-[16px]"
            >
              <BouncyCheckbox
                size={25}
                fillColor="#7F56D9"
                unfillColor="white"
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() => dispatch(toggleTasks(task.id))}
              />
              <Text className="text-2xl font-[InterM] text-[#30374F] ">
                {task?.title}
              </Text>
            </TouchableOpacity>
          </Animate.View>
        ))}
      </ScrollView>
      {/* Adding task section */}
      <Animate.View animation="fadeInUp" duration={600}>
      <TouchableOpacity
        onPress={openModal}
        className="w-[343px] h-[72px] flex-row  space-x-4 px-4  items-center bg-[#F9F9FB] mt-[12px] rounded-[16px] mb-[56px]"
      >
        <Image
          source={union}
          className="object-contain w-[15.33px]  h-[15.33px]"
        />
        <Text className="text-xl font-[InterM] text-[#ABB6C8] ">Add Task</Text>
      </TouchableOpacity>
      </Animate.View>
      <View className="">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="w-[320px]  bg-[#F9F9FB] border-[#5D6B98] border-2  rounded-[16px] shadow-2xl  m-auto">
            <Text className="text-center text-2xl font-semibold text-[#1D2939] mt-2 mb-2">
              Add Task
            </Text>

            <View className="flex-col space-y-2 px-2">
              <TextInput
                className="w-full bg-white border-[#5D6B98] border-2 rounded-lg   text-xl p-2 font-[InterM] text-black"
                placeholder="Title"
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
              <TextInput
                className="w-full bg-white border-[#5D6B98] border-2 rounded-lg text-xl p-2 font-[InterM] text-black"
                placeholder="Description"
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />

              <TouchableOpacity
                onPress={addTask}
                className="w-full rounded-lg bg-[#5D6B98] p-3 mb-3"
              >
                <Text className=" text-center text-2xl text-white font-bold">
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Confirmation"
        message="Do you want to delete all the tasks?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes"
        titleStyle={{ fontWeight: "bold" }}
        cancelButtonTextStyle={{ color: "black" }}
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowAlert(false);
        }}
        onConfirmPressed={() => {
          dispatch(deleteAllTasks());
          setIndividualTask({
            ...individualTask,
            title: "",
            description: "",
          });
          setShowAlert(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Main;
