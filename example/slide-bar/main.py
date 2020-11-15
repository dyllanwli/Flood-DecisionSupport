import streamlit as st
import pandas as pd

option = st.sidebar.selectbox(
    'Options',
     ('Active Layers and weighting', 'Social Sensing', 'Community Survey')
)

'#', option

st.write("""
---
""")


if st.checkbox("Condition 1"):
    x1 = st.slider("Select condition 1")
    st.write("You selected", x1)

if st.checkbox("Condition 2"):
    x2 = st.slider("Select Condition 2")
    st.write("You selected", x2)

st.write("""
---
""")

if st.button("Run"):
    st.write("RESULT")
else:
    st.write("Result shows here")


st.write("""
---
""")

r = st.radio(
    "Select ratio condition",
    ('1', '2')
)
st.write("You selected", r)