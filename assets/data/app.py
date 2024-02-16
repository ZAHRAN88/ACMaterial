import json
import tkinter as tk
from tkinter import ttk, messagebox
from ttkthemes import ThemedStyle
import os

def load_courses():
    try:
        with open('weeks.json', 'r') as file:
            courses = json.load(file)
    except FileNotFoundError:
        courses = []
    return courses

def save_courses(courses):
    with open('weeks.json', 'w') as file:
        json.dump(courses, file, indent=4)

def add_week():
    course_name = combo_course_name.get()
    week_name = entry_week_name.get()
    lecture_link = entry_lecture_link.get()
    pdf_link = entry_pdf_link.get()
    section_link = entry_section_link.get()

    new_week = {
        "weekName": week_name,
        "resources": []
    }

    # Add lecture link if provided
    if lecture_link:
        new_week['resources'].append({"icon": "fas fa-play-circle", "text": "Lecture (Video)", "link": lecture_link})

    # Add PDF link
    new_week['resources'].append({"icon": "fas fa-file-download", "text": "Lecture (PDF)", "link": pdf_link})
    new_week['resources'].append({"icon": "fas fa-file-download", "text": "Section (PDF)", "link": section_link})

    courses = load_courses()
    for course in courses:
        if course['courseName'] == course_name:
            course['weeks'].append(new_week)
            save_courses(courses)  # Save the updated courses
            messagebox.showinfo("Success", "Week added successfully!")
            refresh_week_listbox(course_name)
            return

    messagebox.showerror("Error", f"Course '{course_name}' not found!")

def display_week_info(event):
    selected_index = listbox_weeks.curselection()
    if selected_index:
        selected_index = selected_index[0]
        selected_course = combo_course_name.get()
        courses = load_courses()
        for course in courses:
            if course['courseName'] == selected_course:
                if selected_index < len(course['weeks']):  # Check if selected_index is within bounds
                    week_info = course['weeks'][selected_index]
                    entry_week_name.delete(0, tk.END)
                    entry_week_name.insert(tk.END, week_info['weekName'])
                    entry_lecture_link.delete(0, tk.END)
                    entry_lecture_link.insert(tk.END, week_info['resources'][0]['link'] if week_info['resources'] and len(week_info['resources']) > 0 else '')
                    entry_pdf_link.delete(0, tk.END)
                    entry_pdf_link.insert(tk.END, week_info['resources'][1]['link'] if week_info['resources'] and len(week_info['resources']) > 1 else '')
                    entry_section_link.delete(0, tk.END)
                    entry_section_link.insert(tk.END, week_info['resources'][2]['link'] if week_info['resources'] and len(week_info['resources']) > 2 else '')
                else:
                    messagebox.showerror("Error", "Invalid week index selected.")
def update_week():
    selected_index = listbox_weeks.curselection()
    if selected_index:
        selected_index = selected_index[0]
        selected_course = combo_course_name.get()
        courses = load_courses()
        for course in courses:
            if course['courseName'] == selected_course:
                if selected_index < len(course['weeks']):  # Check if selected_index is within bounds
                    week_info = course['weeks'][selected_index]
                    week_info['weekName'] = entry_week_name.get()
                    if entry_lecture_link.get():  # Only update if lecture link is provided
                        if len(week_info['resources']) > 0:
                            week_info['resources'][0]['link'] = entry_lecture_link.get()
                        else:
                            week_info['resources'].append({"icon": "fas fa-play-circle", "text": "Lecture (Video)", "link": entry_lecture_link.get()})
                    if len(week_info['resources']) > 1:
                        week_info['resources'][1]['link'] = entry_pdf_link.get()
                    else:
                        week_info['resources'].append({"icon": "fas fa-file-download", "text": "Lecture (PDF)", "link": entry_pdf_link.get()})
                    if len(week_info['resources']) > 2:
                        week_info['resources'][2]['link'] = entry_section_link.get()
                    else:
                        week_info['resources'].append({"icon": "fas fa-file-download", "text": "Section (PDF)", "link": entry_section_link.get()})
                    save_courses(courses)
                    messagebox.showinfo("Success", "Week updated successfully!")
                    refresh_week_listbox(selected_course)
                    return
                else:
                    messagebox.showerror("Error", "Invalid week index selected.")

def clear_entries():
    result = messagebox.askokcancel("Confirmation", "Are you sure you want to clear all entries?")
    if result:
        entry_week_name.delete(0, tk.END)
        entry_lecture_link.delete(0, tk.END)
        entry_pdf_link.delete(0, tk.END)
        entry_section_link.delete(0, tk.END)

def refresh_combobox():
    courses = load_courses()
    course_names = [course['courseName'] for course in courses]
    combo_course_name['values'] = course_names

def refresh_week_listbox(event=None):
    listbox_weeks.delete(0, tk.END)
    selected_course = combo_course_name.get()
    courses = load_courses()
    for course in courses:
        if course['courseName'] == selected_course:
            for week in course['weeks']:
                listbox_weeks.insert(tk.END, week['weekName'])

# Create the main window
root = tk.Tk()
root.title("Course Management")

# Apply themed style with gradient color
style = ThemedStyle(root)
style.set_theme("plastik")
icon_path = os.path.join(os.path.dirname(__file__), 'app.ico')
root.iconbitmap(icon_path)

# Define the combo_course_name widget and bind the event
combo_course_name = ttk.Combobox(root, state="readonly")
combo_course_name.grid(row=0, column=1, pady=5)
combo_course_name.bind("<<ComboboxSelected>>", refresh_week_listbox)

# Create labels and entry widgets for course information
label_course_name = ttk.Label(root, text="Select Course:")
label_week_name = ttk.Label(root, text="Week Name:")
entry_week_name = ttk.Entry(root)
label_lecture_link = ttk.Label(root, text="Lecture Link (optional):")
entry_lecture_link = ttk.Entry(root)
label_pdf_link = ttk.Label(root, text="PDF Link:")
entry_pdf_link = ttk.Entry(root)
label_section_link = ttk.Label(root, text="Section Link:")
entry_section_link = ttk.Entry(root)

# Create buttons for actions
button_add_week = ttk.Button(root, text="Add Week", command=add_week)
button_update_week = ttk.Button(root, text="Update Week", command=update_week)
button_clear_entries = ttk.Button(root, text="Clear Entries", command=clear_entries)

# Create listbox to display weeks
listbox_weeks = tk.Listbox(root, height=5)
listbox_weeks.bind("<Double-Button-1>", display_week_info)

# Add scrolling for the listbox
scrollbar = ttk.Scrollbar(root, orient="vertical", command=listbox_weeks.yview)
scrollbar.grid(row=7, column=2, sticky='ns')
listbox_weeks.config(yscrollcommand=scrollbar.set)

# Position widgets in the grid layout
label_course_name.grid(row=0, column=0, sticky="e", padx=5, pady=5)
label_week_name.grid(row=1, column=0, sticky="e", padx=5, pady=5)
label_lecture_link.grid(row=2, column=0, sticky="e", padx=5, pady=5)
label_pdf_link.grid(row=3, column=0, sticky="e", padx=5, pady=5)
label_section_link.grid(row=4, column=0, sticky="e", padx=5, pady=5)
entry_week_name.grid(row=1, column=1, pady=5)
entry_lecture_link.grid(row=2, column=1, pady=5)
entry_pdf_link.grid(row=3, column=1, pady=5)
entry_section_link.grid(row=4, column=1, pady=5)
button_add_week.grid(row=5, column=0, pady=5, padx=5, sticky='ew')
button_update_week.grid(row=5, column=1, pady=5, padx=5, sticky='ew')
button_clear_entries.grid(row=6, column=0, columnspan=2, pady=5, padx=5, sticky='ew')
listbox_weeks.grid(row=7, column=0, columnspan=2, pady=5, padx=5, sticky='nsew')

# Populate combobox with course names
refresh_combobox()

# Start the GUI
root.mainloop()
