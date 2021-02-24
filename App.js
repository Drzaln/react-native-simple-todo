import CheckBox from '@react-native-community/checkbox'
import React from 'react'
import { Button, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'

const App = () => {
	const [ data, setData ] = React.useState([])
	const [ todoValue, setTodoValue ] = React.useState('')
	const inputRef = React.useRef()
	const scrollRef = React.useRef()

	const renderItem = ({ item, index }) => <TodoItem item={item} onValueChange={() => toggleCheckbox(index)} />

	const saveTask = () => {
		const newArr = [ ...data ]
		newArr.push({ id: (newArr.length + 1).toString(), task: todoValue, done: false })
		setData(newArr)
		inputRef.current.clear()
		setTodoValue('')
	}

	const toggleCheckbox = (index) => {
		const newArr = [ ...data ]
		newArr[index].done = !newArr[index].done
		setData(newArr)
	}

	return (
		<SafeAreaView style={styles.mainContainer}>
			<StatusBar backgroundColor='white' barStyle='dark-content' />
			<Text style={styles.title}>My Todos</Text>
			<FlatList
				ref={scrollRef}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ marginHorizontal: 24 }}
				data={data.sort((a, b) => a.done - b.done)}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={() => <View />}
				onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
			/>
			<AddTodo
				ref={inputRef}
				onChangeText={(text) => setTodoValue(text)}
				textValue={todoValue}
				addHandler={saveTask}
			/>
		</SafeAreaView>
	)
}

export default App

const AddTodo = React.forwardRef(({ onChangeText, textValue, addHandler }, ref) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				padding: 24,
				justifyContent: 'space-between'
			}}>
			<TextInput
				ref={ref}
				style={{
					height: 40,
					borderColor: 'gray',
					borderWidth: 1,
					flex: 0.6,
					borderRadius: 8,
					paddingHorizontal: 16
				}}
				onChangeText={(text) => onChangeText(text)}
				value={textValue}
				placeholder='Your todo'
			/>
			<View style={{ flex: 0.3 }}>
				<Button disabled={textValue ? false : true} title='Add Todo' onPress={addHandler} />
			</View>
		</View>
	)
})

const TodoItem = ({ onValueChange, item }) => {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
			<CheckBox
				disabled={false}
				tintColors={{ true: 'lightgrey', false: 'grey' }}
				value={item.done}
				onValueChange={onValueChange}
			/>
			<Text
				style={{
					marginLeft: 8,
					marginTop: 4,
					lineHeight: 22,
					textDecorationLine: item.done ? 'line-through' : 'none',
					color: item.done ? 'grey' : 'black'
				}}>
				{item.task}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: { backgroundColor: 'white', flex: 1 },
	title: { fontSize: 32, fontWeight: 'bold', margin: 24 }
})
