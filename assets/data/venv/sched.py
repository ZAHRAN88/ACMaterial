import json
import tkinter as tk
from tkinter import ttk


class ClassScheduleModel:
    def __init__(self, data):
        self.data = data

    def add_class(self, class_name):
        class_id = str(len(self.data['classes']) + 1)
        new_class = {
            'id': class_id,
            'name': class_name,
            'schedule': {}
        }
        self.data['classes'].append(new_class)

    def add_schedule(self, class_id, day, time, activity, location, instructor):
        class_id = int(class_id)  # Convert class_id to integer
        for class_data in self.data['classes']:
            if class_data['id'] == str(class_id):
                if day not in class_data['schedule']:
                    class_data['schedule'][day] = {}
                class_data['schedule'][day]['time'] = time
                class_data['schedule'][day]['activity'] = activity
                class_data['schedule'][day]['location'] = location
                class_data['schedule'][day]['instructor'] = instructor
                break


class ClassScheduleView:
    def __init__(self, root, controller):
        self.root = root
        self.controller = controller
        self.root.title('Class Schedule App')
        self.setup_ui()

    def setup_ui(self):
        # Label and Entry for Class Name
        self.class_name_label = tk.Label(self.root, text="Class Name:")
        self.class_name_label.pack()
        self.class_name_entry = tk.Entry(self.root)
        self.class_name_entry.pack()

        # Label and Entry for Class ID
        self.class_id_label = tk.Label(self.root, text="Class ID:")
        self.class_id_label.pack()
        self.class_id_entry = tk.Entry(self.root)
        self.class_id_entry.pack()

        # Label and Entry for Day
        self.day_label = tk.Label(self.root, text="Day:")
        self.day_label.pack()
        self.day_entry = tk.Entry(self.root)
        self.day_entry.pack()

        # Label and Entry for Time
        self.time_label = tk.Label(self.root, text="Time:")
        self.time_label.pack()
        self.time_entry = tk.Entry(self.root)
        self.time_entry.pack()

        # Label and Entry for Activity
        self.activity_label = tk.Label(self.root, text="Activity:")
        self.activity_label.pack()
        self.activity_entry = tk.Entry(self.root)
        self.activity_entry.pack()

        # Label and Entry for Location
        self.location_label = tk.Label(self.root, text="Location:")
        self.location_label.pack()
        self.location_entry = tk.Entry(self.root)
        self.location_entry.pack()

        # Label and Entry for Instructor
        self.instructor_label = tk.Label(self.root, text="Instructor:")
        self.instructor_label.pack()
        self.instructor_entry = tk.Entry(self.root)
        self.instructor_entry.pack()

        # Buttons
        self.add_class_button = tk.Button(self.root, text='Add Class', command=self.add_class)
        self.add_class_button.pack(fill='x')
        self.add_schedule_button = tk.Button(self.root, text='Add Schedule', command=self.add_schedule)
        self.add_schedule_button.pack(fill='x')

        # Treeview
        self.tree = ttk.Treeview(self.root, columns=('name', 'day', 'time', 'activity', 'location', 'instructor'),
                                 show='headings')
        # Column setup...
        self.tree.pack(fill='both', expand=True)

    def add_class(self):
        class_name = self.class_name_entry.get()
        class_id = self.class_id_entry.get()
        self.controller.add_class(class_name, class_id)
        self.clear_entries()

    def add_schedule(self):
        class_id = self.class_id_entry.get()
        day = self.day_entry.get()
        time = self.time_entry.get()
        activity = self.activity_entry.get()
        location = self.location_entry.get()
        instructor = self.instructor_entry.get()
        self.controller.add_schedule(class_id, day, time, activity, location, instructor)
        self.clear_entries()

    def clear_entries(self):
        self.class_name_entry.delete(0, 'end')
        self.class_id_entry.delete(0, 'end')
        self.day_entry.delete(0, 'end')
        self.time_entry.delete(0, 'end')
        self.activity_entry.delete(0, 'end')
        self.location_entry.delete(0, 'end')
        self.instructor_entry.delete(0, 'end')


class ClassScheduleController:
    def __init__(self, model, view):
        self.model = model
        self.view = view

    def add_class(self, class_name, class_id):
        self.model.add_class(class_name, class_id)
        self.view.populate_tree()

    def add_schedule(self, class_id, day, time, activity, location, instructor):
        self.model.add_schedule(class_id, day, time, activity, location, instructor)
        self.view.populate_tree()


if __name__ == '__main__':
    try:
        with open('../courses.json') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {'classes': []}

    model = ClassScheduleModel(data)
    root = tk.Tk()
    controller = ClassScheduleController(model, None)
    controller.view = ClassScheduleView(root, controller)
    root.mainloop()

    with open('../courses.json', 'w') as file:
        json.dump(data, file)
